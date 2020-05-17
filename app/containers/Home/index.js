import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Home from './component/home';
import Category from './component/category';
import Subcategory from './component/sub-category';
import { makeSelectPageInfo } from '../App/selectors';
import { makeSelectLocationDetails, makeSelectCategory, makeSelectSteps, makeSelectSubCategory, makeSelectCategoryName } from './selectors';

function HomePage({ pageInfo, defaultLocation, category, steps, subCategory, setSteps, setSubCategory, categoryName, setCategoryName }) {
    useInjectReducer({ key: 'homePage', reducer });
    useInjectSaga({ key: 'homePage', saga });

    const {
        pageData: { data },
    } = pageInfo;

    const pageWrapper = () => {
        switch (steps) {
            case 'CATEGORY':
                return (
                    <Category
                        category={category}
                        defaultLocation={defaultLocation}
                        data={data.locations}
                        setSubCategory={setSubCategory}
                        setSteps={setSteps}
                        setCategoryName={setCategoryName}
                    />
                );
            case 'SUB-CATEGORY':
                return <Subcategory subCategory={subCategory} setSteps={setSteps} categoryName={categoryName} />;
            default:
                return <Home />;
        }
    };

    return (
        <section className="pageWrapper">
            <Header location={data.locations} />
            <div className="contentDataWrapper">{pageWrapper()}</div>
            <Footer />
        </section>
    );
}

HomePage.propTypes = {
    pageInfo: PropTypes.object.isRequired,
    defaultLocation: PropTypes.string.isRequired,
    category: PropTypes.array.isRequired,
    subCategory: PropTypes.array.isRequired,
    steps: PropTypes.string.isRequired,
    setSteps: PropTypes.func.isRequired,
    setSubCategory: PropTypes.func.isRequired,
    categoryName: PropTypes.string.isRequired,
    setCategoryName: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    pageInfo: makeSelectPageInfo(),
    defaultLocation: makeSelectLocationDetails(),
    category: makeSelectCategory(),
    steps: makeSelectSteps(),
    subCategory: makeSelectSubCategory(),
    categoryName: makeSelectCategoryName(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(HomePage);
