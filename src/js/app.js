require('../sass/app.scss');

import React from 'react';
import { render } from 'react-dom';

import TouhouTest from './touhou-test/touhou-test.jsx'
import { characters } from './json/characters.js';

render(
    <TouhouTest characters={characters} maxSteps={20} />,
    document.getElementById('touhou')
);
