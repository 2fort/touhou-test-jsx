import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import DocumentTitle from 'react-document-title';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TestActions from '../actions/testActions';

const Navigation = ({ resetButtonVisible, resetTest }) => {
    let reloadButton =
        (resetButtonVisible) ?
            <button
              type="button"
              className="reload"
              title="Reset"
              onClick={resetTest}
            >
              ↻
            </button> : null;

    return (
        <div className="menu">
            <nav>
                <Link
                  to={(process.env.NODE_ENV === 'development' ? '/' : '/touhou-test-jsx')}
                >
                  Touhou @ Comiket
                </Link>
                {reloadButton}
                <Link to="/test" activeClassName="active">Test x20</Link>
                <Link to="/characters" activeClassName="active">Characters</Link>
            </nav>
        </div>
    );
};

Navigation.propTypes = {
    resetButtonVisible: PropTypes.bool.isRequired,
    resetTest: PropTypes.func.isRequired,
};


const Layout = ({ resetButtonVisible, children, actions }) => (
    <div>
        <Navigation resetButtonVisible={resetButtonVisible} resetTest={actions.resetTest} />
        <DocumentTitle title="Touhou | Comiket">
            {children}
        </DocumentTitle>
    </div>
);

Layout.propTypes = {
    children: PropTypes.node,
    resetButtonVisible: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        resetButtonVisible: state.test.resetButtonVisible,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TestActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

// export default Layout;
