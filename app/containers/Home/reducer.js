import produce from 'immer';
import { SET_LOCATION, SET_CATEGORY, SET_SUBCATEGORY, LOCATION_VALUE, STEPS, CATEGORY } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_LOCATION:
                draft.location = action.location;
                break;
            case SET_CATEGORY:
                draft.category = action.category;
                break;
            case SET_SUBCATEGORY:
                draft.subCategory = action.subCategory;
                break;
            case LOCATION_VALUE:
                draft.locationDetail = action.locationDetail;
                break;
            case STEPS:
                draft.steps = action.steps;
                break;
            case CATEGORY:
                draft.categoryName = action.categoryName;
                break;
        }
    });

export default loginReducer;
