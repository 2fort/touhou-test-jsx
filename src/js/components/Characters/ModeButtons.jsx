import React, { PropTypes } from 'react';

const ModeButtons = ({ pathname, replace, char }) => {
    if (char) {
        return <div className="modebuttons">&nbsp;</div>;
    }
    return (
        <div className="modebuttons">
            <button type="button" onClick={() => replace({ pathname, query: { mode: 'grid' }, state: {} })}>
                <i className="fa fa-th-large fa-lg" aria-hidden="true"></i>
            </button>
            <button type="button" onClick={() => replace({ pathname, query: { mode: 'table' }, state: {} })}>
                <i className="fa fa-table fa-lg" aria-hidden="true"></i>
            </button>
        </div>
    );
};

ModeButtons.propTypes = {
    pathname: PropTypes.string,
    replace: PropTypes.func,
    char: PropTypes.string,
};

export default ModeButtons;
