import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import _ from 'lodash';
import DocumentTitle from 'react-document-title';

import * as testApi from '../../api';

const GamesList = ({ location: { pathname, query } }) => {
    const gamesFlex = testApi.getAllGames();
    let data = '';

    if (query && query.mode === 'table') {
        const tableData = gamesFlex.map(game => (
            <tr key={game.title}>
                <td className="td-centered">
                    <Link className="imagelink" to={`${pathname}/${_.snakeCase(game.title)}`}>
                        <img alt="char" src={require(`../../../images/games/${game.cover}`)} />
                    </Link>
                </td>
                <td>
                    {game.prefix ? `${game.prefix}: ` : ''}
                    <Link to={`${pathname}/${_.snakeCase(game.title)}`}>
                        {game.title}
                    </Link>
                </td>
                <td className="td-centered">{game.year}</td>
            </tr>
        ));

        data = (() => (
            <table className="pure-table pure-table-striped">
                <thead>
                    <tr>
                        <th className="td-centered">Cover</th>
                        <th>Title</th>
                        <th className="td-centered">Year</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        ))();
    } else {
        data = gamesFlex.map(game => (
            <div key={game.title} className="flex-item">
                <p>
                    <Link className="imagelink" to={`${pathname}/${_.snakeCase(game.title)}`}>
                        <img alt="char" src={require(`../../../images/games/${game.cover}`)} />
                    </Link>
                </p>
                <p>
                    <Link to={`${pathname}/${_.snakeCase(game.title)}`}>{game.title}</Link>
                </p>
                <p>{game.year}</p>
            </div>
        ));
    }

    return (
        <DocumentTitle title="Characters | Touhou">
            <div className="flex-container">
                {data}
            </div>
        </DocumentTitle>
    );
};

GamesList.propTypes = {
    location: PropTypes.object,
};

export default GamesList;
