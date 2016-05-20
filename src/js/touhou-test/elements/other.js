import React from 'react';

const Navigation = ({ reset }) => (
    <div className="menu">
        <nav>
            <a href={(process.env.NODE_ENV === 'development' ? '/' : '/touhou-test-jsx')}>Touhou-test-jsx</a>
            <button type="button" className="reload" onClick={reset}>↻</button>
        </nav>
    </div>
);

Navigation.propTypes = {
    reset: React.PropTypes.func.isRequired,
};

const NextButton = ({ color, changeStep, children }) => (
    <div className="navigation">
        <button type="button" className={color} id="next" onClick={() => changeStep('next')}>
           {children}
        </button>
    </div>
);

NextButton.propTypes = {
    color: React.PropTypes.string.isRequired,
    changeStep: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
};

const PrevButton = ({ color, changeStep, children }) => (
    <div className="navigation">
        <button type="button" className={color} id="prev" onClick={() => changeStep('prev')}>
            {children}
        </button>
    </div>
);

PrevButton.propTypes = {
    color: React.PropTypes.string.isRequired,
    changeStep: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
};

const CharacterButtons = ({ buttons, checkAnswer }) => {
    let charButtons = buttons.map((btn, i) =>
        <button type="button" key={i} className={btn.color} id={`option${i + 1}`} onClick={checkAnswer}>
            {btn.name}
        </button>
    );
    return (<div className="buttons">{charButtons}</div>);
};

CharacterButtons.propTypes = {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
        color: React.PropTypes.string,
    })).isRequired,
    checkAnswer: React.PropTypes.func.isRequired,
};

const TopButtons = ({ data }) => {
    let topButtons = data.map((topbtn, i) =>
        <div key={i} className={topbtn} id={`step${i + 1}`}>
            &nbsp;
        </div>
    );
    return (
        <div className="topbuttons" id="mytopbuttons">
            {topButtons}
        </div>
    );
};

TopButtons.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export { NextButton, PrevButton, CharacterButtons, TopButtons, Navigation };
