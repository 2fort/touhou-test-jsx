import React from 'react';

const Navigation = (props) => (
    <div className="menu">
        <nav>
            <a href={(process.env.NODE_ENV == 'development' ? '/' : '/touhou-test-jsx')}>Touhou-test-jsx</a>
            <button type="button" className="reload" onClick={props.reset}>↻</button>
        </nav>
    </div>
);

Navigation.propTypes = {
    reset: React.PropTypes.func.isRequired,
};

const NextButton = (props) => (
    <div className="navigation">
        <button type="button" className={props.color} id="next" onClick={() => props.changeStep('next')}>
           &nbsp;&gt;&nbsp;
        </button>
    </div>
);

NextButton.propTypes = {
    color: React.PropTypes.string.isRequired,
    changeStep: React.PropTypes.func.isRequired,
};

const PrevButton = (props) => (
    <div className="navigation">
        <button type="button" className={props.color} id="prev" onClick={() => props.changeStep('prev')}>
            &nbsp;&lt;&nbsp;
        </button>
    </div>
);

PrevButton.propTypes = {
    color: React.PropTypes.string.isRequired,
    changeStep: React.PropTypes.func.isRequired,
};

const CharacterButtons = (props) => {
    let buttons = props.buttons.map((btn, i) =>
        <button type="button" key={i} className={btn.color} id={`option${i + 1}`} onClick={props.checkAnswer}>
            {btn.name}
        </button>
    );
    return (<div className="buttons">{buttons}</div>);
};

CharacterButtons.propTypes = {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
        color: React.PropTypes.string,
    })).isRequired,
    checkAnswer: React.PropTypes.func.isRequired,
};

const TopButtons = (props) => {
    let topButtons = props.data.map((topbtn, i) =>
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
