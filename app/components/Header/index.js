import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../../containers/Home/reducer';
import saga from '../../containers/Home/saga';
import * as Actions from '../../containers/Home/actions';
import { makeSelectLocation } from '../../containers/Home/selectors';
import Utils from '../../utils/common';
import './header.scss';

function Header({ location, setLocation, defaultLocation, locationDetails, setSteps }) {
    useInjectReducer({ key: 'homePage', reducer });
    useInjectSaga({ key: 'homePage', saga });

    const setLocationValue = (dealers, branch) => {
        if (!Utils.isUndefinedOrNullOrEmptyObject(branch)) {
            setLocation({ location: `${dealers.name} (${branch.name})` });
            locationDetails({ locationDetail: `${dealers.dealers_id}|${branch.branch_id}` });
            setSteps({ steps: 'CATEGORY' });
            return;
        }
        setLocation({ location: `${dealers.name}` });
        locationDetails({ locationDetail: `${dealers.dealers_id}` });
        setSteps({ steps: 'CATEGORY' });
    };

    const getSubMenu = (locationText, data) =>
        data.map((item, index) => {
            const keyLi = `li-${index}`;
            return (
                <li key={keyLi}>
                    <span role="button" title={item.name} onClick={() => setLocationValue(locationText, item)} tabIndex={0}>
                        {item.name}
                    </span>
                </li>
            );
        });

    const getMenu = () =>
        location.map((item, index) => {
            const uiKeys = `ui-${index}`;
            return (
                <li className="has-submenu" key={uiKeys}>
                    <span className="prett" role="button" onClick={() => setLocationValue(item)} tabIndex={0}>
                        {item.name}
                    </span>
                    <ul className="submenu">{getSubMenu(item, item.branches)}</ul>
                </li>
            );
        });

    const getDefaultLocation = () => {
        let defLocation = 'Select Location';
        if (!Utils.isUndefinedOrNullOrEmpty(defaultLocation)) {
            defLocation = defaultLocation;
        }
        return defLocation;
    };

    return (
        <header className="toolbar">
            <div className="headerWrap">
                <nav className="toolbar__navigation">
                    <div className="headerRow">
                        <div className="toolbar__logo">
                            <a href="/">
                                <span className="logoText">RENTAL MANAGEMENT SYSTEM</span>
                            </a>
                        </div>
                        <div className="location">
                            <ul id="menu">
                                <li>
                                    <span className="prett locationText"> {getDefaultLocation()} </span>
                                    <ul className="menus">{getMenu()}</ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

Header.propTypes = {
    location: PropTypes.array.isRequired,
    setLocation: PropTypes.func.isRequired,
    defaultLocation: PropTypes.string.isRequired,
    locationDetails: PropTypes.func.isRequired,
    setSteps: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    defaultLocation: makeSelectLocation(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Header);
