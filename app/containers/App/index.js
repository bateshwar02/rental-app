import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

import * as Actions from './action';
import Home from '../Home/Loadable';
export function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </>
    );
}

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(App);
