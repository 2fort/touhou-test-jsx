import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import snakeCase from 'lodash/snakeCase';
import DocumentTitle from 'react-document-title';

import * as testApi from '../../api';

const CharactersList = ({ location, params }) => {
    const charsFlex = testApi.getAllCharsFromGame(params.game).map(char => (
        <div key={char.name} className="flex-item">
            <p>
                <Link className="imagelink" to={`${location.pathname}/${snakeCase(char.name)}`}>
                    <img alt="char" src={require(`../../../images/scale/${char.image}`)} />
                </Link>
            </p>
            <p>
                <Link to={`${location.pathname}/${snakeCase(char.name)}`}>{char.name}</Link>
            </p>
        </div>
    ));
    return (
        <DocumentTitle title={`${testApi.getProperGameTitle(params.game)} | Touhou`}>
            <div className="flex-container">
                {charsFlex}
            </div>
        </DocumentTitle>
    );
};

// TODO: create /about page and hamburger button

CharactersList.propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
};

export default CharactersList;
