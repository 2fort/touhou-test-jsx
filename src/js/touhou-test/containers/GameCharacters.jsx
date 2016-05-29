import React, { PropTypes } from 'react';
import snakeCase from 'lodash/lowerCase';
import DocumentTitle from 'react-document-title';

const GameCharacters = ({ location, params }) => (
    <DocumentTitle title="Game | Touhou">
        <div className="simple-container">
            pathname: {location.pathname} <br />
            params: {snakeCase(params.game)} <br />
        </div>
    </DocumentTitle>
);

GameCharacters.propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
};

export default GameCharacters;
