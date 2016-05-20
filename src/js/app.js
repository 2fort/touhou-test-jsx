require('../sass/app.scss');

import React from 'react';
import { render } from 'react-dom';

import TouhouTest from './touhou-test/touhou-test.jsx';
import { characters } from './touhou-test/classes/characters.js';

render(
    <TouhouTest data={characters} maxSteps={20} />,
    document.getElementById('touhou')
);
