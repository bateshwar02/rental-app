import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../../utils/common';
import '../home.scss';

function Category({ defaultLocation, data, category, setSteps, setSubCategory, setCategoryName }) {
    const [categoryArr, setCategory] = useState(category);

    useEffect(() => {
        if (!Utils.isUndefinedOrNullOrEmpty(defaultLocation) && Utils.isUndefinedOrNullOrEmptyList(category)) {
            const arr = defaultLocation.split('|');
            const catData = [];
            data.forEach(item => {
                if (item.dealers_id === arr[0]) {
                    item.branches.forEach(val => {
                        if (arr.length === 1) {
                            catData.push(...val.categories);
                        }
                        if (val.branch_id === arr[1]) {
                            catData.push(...val.categories);
                        }
                    });
                }
            });
            setCategory(catData);
        }
    }, [category, data, defaultLocation]);

    const getSubCategory = value => {
        setSteps({ steps: 'SUB-CATEGORY' });
        setSubCategory({ subCategory: value.subcategories });
        setCategoryName({ categoryName: value.name });
    };

    const getCatList = () =>
        categoryArr.map((item, index) => {
            const keys = `key-${index}`;
            return (
                <div className="listing" key={keys} onClick={() => getSubCategory(item)} role="button" tabIndex={0}>
                    <div className="imageWrapper">
                        <img src={`category/${item.name === 'NA' ? 'na.png' : item.image}`} alt="" />
                    </div>
                    <div className="textWrapper">
                        <span className="textTitle"> {item.name} </span>
                        <i className="material-icons">play_arrow</i>
                    </div>
                </div>
            );
        });

    return (
        <div className="catalogWrapper">
            <span className="title">Equipment Catalog</span>
            <div className="catalogListing">{getCatList()}</div>
        </div>
    );
}

Category.propTypes = {
    defaultLocation: PropTypes.string.isRequired,
    category: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    setSteps: PropTypes.func.isRequired,
    setSubCategory: PropTypes.func.isRequired,
    setCategoryName: PropTypes.func.isRequired,
};

export default Category;
