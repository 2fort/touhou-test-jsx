require('../sass/app.scss');

import React from 'react';
import { render } from 'react-dom';

import TouhouTest from './touhou-test';
import _characters from '../api/characters.json';

render(
    <TouhouTest data={_characters} maxSteps={20} />,
    document.getElementById('touhou')
);
