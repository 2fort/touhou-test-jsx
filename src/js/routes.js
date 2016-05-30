import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import Index from './containers/Index';
import Home from './components/Index/Home';
import Test from './containers/Test';
import Characters from './containers/Characters';
import GamesList from './components/Characters/GamesList';
import CharactersList from './components/Characters/CharactersList';
import Character from './components/Characters/Character';

module.exports = (
    <Route path="/" component={Index}>
        <IndexRoute component={Home} />
        <Route path="test" component={Test} />
        <Route path="characters" component={Characters}>
            <IndexRoute component={GamesList} />
            <Route path=":game" component={CharactersList} />
            <Route path=":game/:char" component={Character} />
        </Route>
    </Route>
);
