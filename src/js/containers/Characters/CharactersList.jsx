import React, { PropTypes } from 'react';
import _ from 'lodash';
import DocumentTitle from 'react-document-title';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CharactersActions from '../../actions/charactersActions';
import * as testApi from '../../api';

import List from './List';
import Grid from '../../components/Characters/CharactersList/Grid';
import Table from '../../components/Characters/CharactersList/Table';

class CharactersList extends List {
    render() {
        const { location: { pathname }, params: { game }, mode } = this.props;

        if (!super.check()) {
            return null;
        }

        const charsFlex = testApi.getAllCharsFromGame(game);

        return (
            <DocumentTitle title={`${testApi.getProperGameTitle(game)} | Touhou`}>
                {mode === 'grid'
                    ? <Grid charsFlex={charsFlex} pathname={pathname} snakeCase={_.snakeCase} />
                    : <Table charsFlex={charsFlex} pathname={pathname} snakeCase={_.snakeCase} />
                }
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
