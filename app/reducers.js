/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import globalReducer from './containers/App/reducer';
import homeReducer from './containers/Home/reducer';

import history from './utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        pageInfo: globalReducer,
        homePage: homeReducer,
        router: connectRouter(history),
        ...injectedReducers,
    });

    return rootReducer;
}
