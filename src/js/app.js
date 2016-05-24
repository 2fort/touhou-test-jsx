require('../sass/app.scss');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './touhou-test/store/configureStore';

import TouhouTest from './touhou-test/containers/TouhouTest';

const store = configureStore();

render(
    <Provider store={store}>
        <TouhouTest />
    </Provider>,
    document.getElementById('touhou')
);
