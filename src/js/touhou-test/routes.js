import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './layouts';

import Home from './containers/Home';
import TouhouTest from './containers/TouhouTest';
import Characters from './containers/Characters';

module.exports = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="/test" component={TouhouTest} />
        <Route path="/characters" component={Characters} />
    </Route>
);
