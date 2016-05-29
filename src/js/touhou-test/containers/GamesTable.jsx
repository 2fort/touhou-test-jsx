import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import snakeCase from 'lodash/snakeCase';
import DocumentTitle from 'react-document-title';

import * as testApi from '../api';

const GamesTable = ({ location }) => {
    const gamesTable = testApi.getAllGames();
    return (
        <DocumentTitle title="Characters | Touhou">
            <div className="simple-container">
                <table className="pure-table pure-table-striped">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Year</th>
                            <th>Characters</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gamesTable.map((debut) => (
                            <tr key={debut.game}>
                                <td><Link to={`${location.pathname}/${snakeCase(debut.game)}`}>
                                    {debut.game}
                                </Link>
                                </td>
                                <td>{debut.year}</td>
                                <td>{debut.characters.map((char, i) => {
                                    if (i < 5) {
                                        return char;
                                    } else if (i === 5) {
                                        const others = debut.characters.length - 5;
                                        if (others === 1) {
                                            return `and ${others} other`;
                                        }
                                        return `and ${others} others`;
                                    }
                                    return undefined;
                                }).filter(char => char)
                                    .reduceRight((res, val, idx) => val + (idx === 4 ? ' ' : ', ') + res)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DocumentTitle>
    );
};

GamesTable.propTypes = {
    location: PropTypes.object,
};

export default GamesTable;
