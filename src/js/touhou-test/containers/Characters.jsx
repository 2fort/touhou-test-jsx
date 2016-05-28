import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DocumentTitle from 'react-document-title';

import * as CharactersActions from '../actions/charactersActions';

class Characters extends Component {
    componentWillMount() {
        this.props.actions.showAllGames();
    }
    componentWillUnmount() {

    }
    render() {
        if (!this.props.inProgress) {
            return null;
        }
        let gamesList = this.props.games.map((game, i) => (
            <div key={i}>{game} </div>
        ));

        return (
            <DocumentTitle title="Characters | Touhou">
                <div className="simple-container">{gamesList}</div>
            </DocumentTitle>
    ); }
}

Characters.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    games: PropTypes.array,
    actions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        inProgress: state.characters.inProgress,
        games: state.characters.games,
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
)(Characters);
