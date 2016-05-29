import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import Layout from './layouts';
import Home from './containers/Home';
import TouhouTest from './containers/TouhouTest';
import GamesTable from './containers/GamesTable';
import GameCharacters from './containers/GameCharacters';

module.exports = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="/test" component={TouhouTest} />
        <Route path="/characters" component={GamesTable} />
        <Route path="/characters/:game" component={GameCharacters} />
    </Route>
);
