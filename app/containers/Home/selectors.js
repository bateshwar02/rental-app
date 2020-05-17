import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectCategory = () =>
    createSelector(
        selectLoginDomain,
        ({ category }) => category || [],
    );
const makeSelectSubCategory = () =>
    createSelector(
        selectLoginDomain,
        ({ subCategory }) => subCategory || [],
    );
const makeSelectLocation = () =>
    createSelector(
        selectLoginDomain,
        ({ location }) => location || '',
    );
const makeSelectLocationDetails = () =>
    createSelector(
        selectLoginDomain,
        ({ locationDetail }) => locationDetail || '',
    );
const makeSelectSteps = () =>
    createSelector(
        selectLoginDomain,
        ({ steps }) => steps || 'default',
    );

const makeSelectCategoryName = () =>
    createSelector(
        selectLoginDomain,
        ({ categoryName }) => categoryName || '',
    );

export default makeSelectLocation;
export { makeSelectCategory, makeSelectSubCategory, makeSelectLocation, makeSelectLocationDetails, makeSelectSteps, makeSelectCategoryName };
