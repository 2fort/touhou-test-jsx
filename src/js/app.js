require('../sass/app.scss');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './touhou-test/reducers';

import TouhouTest from './touhou-test/components/TouhouTest';

let store = createStore(rootReducer);

render(
    <Provider store={store}>
        <TouhouTest />
    </Provider>,
    document.getElementById('touhou')
);
