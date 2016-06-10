import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import _ from 'lodash';
import DocumentTitle from 'react-document-title';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CharactersActions from '../../actions/charactersActions';
import * as testApi from '../../api';

import List from './List';

class CharactersList extends List {
    render() {
        const { location: { pathname }, params: { game }, mode } = this.props;

        if (!super.check()) {
            return null;
        }

        const charsFlex = testApi.getAllCharsFromGame(game);
        let data = '';

        if (mode === 'table') {
            const tableData = charsFlex.map(char => (
                <tr key={char.name}>
                    <td className="td-centered">
                        <Link className="imagelink" to={`${pathname}/${_.snakeCase(char.name)}`}>
                            <img alt="char" src={require(`../../../images/s/${char.image}`)} />
                        </Link>
                    </td>
                    <td>
                        <Link to={`${pathname}/${_.snakeCase(char.name)}`}>
                            {char.name}
                        </Link>
                    </td>
                    <td>
                        <a href={char.wiki}>{char.wiki.substr(7)}</a>
                    </td>
                </tr>
            ));

            data = (() => (
                <table className="pure-table pure-table-striped">
                    <thead>
                        <tr>
                            <th className="td-centered">Art</th>
                            <th>Name</th>
                            <th>Wiki</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            ))();
        } else {
            data = charsFlex.map(char => (
                <div key={char.name} className="flex-item">
                    <p>
                        <Link className="imagelink" to={`${pathname}/${_.snakeCase(char.name)}`}>
                            <img alt="char" src={require(`../../../images/s/${char.image}`)} />
                        </Link>
                    </p>
                    <p>
                        <Link to={`${pathname}/${_.snakeCase(char.name)}`}>{char.name}</Link>
                    </p>
                </div>
            ));
        }

        return (
            <DocumentTitle title={`${testApi.getProperGameTitle(game)} | Touhou`}>
                <div className="flex-container">
                    {data}
                </div>
            </DocumentTitle>
        );
    }
}

CharactersList.propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
};

CharactersList.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        mode: state.characters.mode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(CharactersActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CharactersList);
