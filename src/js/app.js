require('../sass/app.scss');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './touhou-test/routes';

import configureStore from './touhou-test/store/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('touhou')
);
