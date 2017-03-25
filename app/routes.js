// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import BasicControl from './containers/BasicControl';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={BasicControl} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
