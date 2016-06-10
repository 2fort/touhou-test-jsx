import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CharactersActions from '../../actions/charactersActions';

class ModeButtons extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(mode) {
        const { pathname, replace, actions: { changeMode } } = this.props;

        if (mode === 'grid') {
            changeMode('grid');
            replace({ pathname, query: {}, state: {} });
        } else {
            changeMode('table');
            replace({ pathname, query: { mode: 'table' }, state: {} });
        }
    }
    render() {
        const { char } = this.props;
        if (char) {
            return <div className="modebuttons">&nbsp;</div>;
        }
        return (
            <div className="modebuttons">
                <button type="button" title="Grid" onClick={() => this.handleClick('grid')}>
                    <i className="fa fa-th-large fa-lg" aria-hidden="true"></i>
                </button>
                <button type="button" title="Table" onClick={() => this.handleClick('table')}>
                    <i className="fa fa-table fa-lg" aria-hidden="true"></i>
                </button>
            </div>
        );
    }
}

ModeButtons.propTypes = {
    pathname: PropTypes.string,
    replace: PropTypes.func,
    char: PropTypes.string,
    actions: PropTypes.object,
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
)(ModeButtons);
