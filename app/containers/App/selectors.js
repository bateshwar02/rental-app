import { createSelector } from 'reselect';

const selectPageInfo = state => state.pageInfo || {};
const makeSelectPageInfo = () =>
    createSelector(
        selectPageInfo,
        pageInfo => pageInfo,
    );

export { makeSelectPageInfo };
