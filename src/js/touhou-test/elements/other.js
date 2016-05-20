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

const CharacterButtons = ({ currentStep, checkAnswer }) => {
    let charButtons = currentStep.buttons.map((name, i) => {
        let color = 'blue';

        if (name === currentStep.rightAnswer && currentStep.givenAnswer !== '') {
            color = 'green';
        } else if (name === currentStep.givenAnswer && currentStep.givenAnswer !== currentStep.rightAnswer) {
            color = 'red';
        }

        color += (currentStep.givenAnswer !== '') ? ' disabled' : '';
        color += (name === currentStep.givenAnswer) ? ' active' : '';

        return (
            <button type="button" key={i} className={color} onClick={checkAnswer}>
                {name}
            </button>
        );
    });

    return (<div className="buttons">{charButtons}</div>);
};

CharacterButtons.propTypes = {
    currentStep: React.PropTypes.object.isRequired,
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
