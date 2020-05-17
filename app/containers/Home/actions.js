import { SET_LOCATION, SET_CATEGORY, SET_SUBCATEGORY, LOCATION_VALUE, STEPS, CATEGORY } from './constants';

export function setCategory({ category }) {
    return {
        type: SET_CATEGORY,
        category,
    };
}

export function setSubCategory({ subCategory }) {
    return {
        type: SET_SUBCATEGORY,
        subCategory,
    };
}

export function setLocation({ location }) {
    return {
        type: SET_LOCATION,
        location,
    };
}

export function locationDetails({ locationDetail }) {
    return {
        type: LOCATION_VALUE,
        locationDetail,
    };
}

export function setSteps({ steps }) {
    return {
        type: STEPS,
        steps,
    };
}

export function setCategoryName({ categoryName }) {
    return {
        type: CATEGORY,
        categoryName,
    };
}
