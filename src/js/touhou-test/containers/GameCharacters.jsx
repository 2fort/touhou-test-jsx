import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import snakeCase from 'lodash/lowerCase';
import DocumentTitle from 'react-document-title';

import * as CharactersActions from '../actions/charactersActions';

const GameCharacters = ({ location, params }) => {
    return (
        <DocumentTitle title="Game | Touhou">
            <div className="simple-container">
            wut <br />
            {snakeCase(location.pathname)} <br />
            {snakeCase(params.game)} <br />
            </div>
        </DocumentTitle>
    ); 
}

GameCharacters.propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
};

export default GameCharacters;