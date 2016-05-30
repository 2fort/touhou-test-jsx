import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import snakeCase from 'lodash/snakeCase';
import DocumentTitle from 'react-document-title';

import * as testApi from '../../api';

const GamesList = ({ location }) => {
    const gamesFlex = testApi.getAllGames().map(game => (
        <div key={game.title} className="flex-item">
            <p>
                <Link className="imagelink" to={`${location.pathname}/${snakeCase(game.title)}`}>
                    <img alt="char" src={require(`../../../images/games/${game.cover}`)} />
                </Link>
            </p>
            <p>
                <Link to={`${location.pathname}/${snakeCase(game.title)}`}>{game.title}</Link>
            </p>
            <p>{game.year}</p>
        </div>
    ));
    return (
        <DocumentTitle title="Characters | Touhou">
            <div className="flex-container">
                {gamesFlex}
            </div>
        </DocumentTitle>
    );
};

GamesList.propTypes = {
    location: PropTypes.object,
};

export default GamesList;
