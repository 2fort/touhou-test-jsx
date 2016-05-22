require('../sass/app.scss');

import React from 'react';
import { render } from 'react-dom';

import TouhouTest from './touhou-test';

render(
    <TouhouTest maxSteps={20} />,
    document.getElementById('touhou')
);
