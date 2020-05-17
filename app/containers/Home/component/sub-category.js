import React from 'react';
import PropTypes from 'prop-types';
import '../home.scss';

function Suncategory({ subCategory, setSteps, categoryName }) {
    const getSubList = () =>
        subCategory.map((item, index) => {
            const keys = `key-${index}`;
            return (
                <div className="listing" key={keys}>
                    <div className="imageWrapper">
                        <img src={`sub-category/${item.name === 'NA' ? 'na.png' : item.image}`} alt="" />
                    </div>
                    <div className="textWrapper">
                        <span className="textTitle"> {item.name} </span>
                        <i className="material-icons">play_arrow</i>
                    </div>
                </div>
            );
        });

    return (
        <div className="subCategoryWrapper">
            <div className="breadcrumb">
                <span className="title" role="button" tabIndex={0} onClick={() => setSteps({ steps: 'CATEGORY' })}>
                    Equipment Catalog
                </span>
                /<span className="title">{categoryName}</span>
            </div>
            <div className="catalogListing">{getSubList()}</div>
        </div>
    );
}

Suncategory.propTypes = {
    subCategory: PropTypes.array.isRequired,
    setSteps: PropTypes.func.isRequired,
    categoryName: PropTypes.string.isRequired,
};
export default Suncategory;
