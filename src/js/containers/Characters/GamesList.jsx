import React, { PropTypes } from 'react';
import _ from 'lodash';
import DocumentTitle from 'react-document-title';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CharactersActions from '../../actions/charactersActions';
import * as testApi from '../../api';

import List from './List';
import Grid from '../../components/Characters/GamesList/Grid';
import Table from '../../components/Characters/GamesList/Table';

class GamesList extends List {
    render() {
        const { location: { pathname }, mode } = this.props;

        if (!super.check()) {
            return null;
        }

        const gamesFlex = testApi.getAllGames();

        return (
            <DocumentTitle title="Characters | Touhou">
                {mode === 'grid'
                    ? <Grid gamesFlex={gamesFlex} pathname={pathname} snakeCase={_.snakeCase} />
                    : <Table gamesFlex={gamesFlex} pathname={pathname} snakeCase={_.snakeCase} />
                }
            </DocumentTitle>
        );
    }
}

GamesList.propTypes = {
    location: PropTypes.object,
    mode: PropTypes.string,
    actions: PropTypes.object,
};

GamesList.contextTypes = {
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
)(GamesList);
