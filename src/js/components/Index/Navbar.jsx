import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';

const Navbar = ({ resetButtonVisible, resetTest }) => {
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
                <Link to="/">Touhou @ Comiket</Link>

                {reloadButton}
                <Link to="/test" activeClassName="active">Test</Link>
                <Link to="/characters" activeClassName="active">Characters</Link>
                <a className="git" href="https://github.com/2fort/touhou-test-jsx">
                    <i className="fa fa-github fa-fw fa-lg" aria-hidden="true"></i> Github
                </a>
            </nav>
        </div>
    );
};

Navbar.propTypes = {
    resetButtonVisible: PropTypes.bool.isRequired,
    resetTest: PropTypes.func.isRequired,
};

export default Navbar;
