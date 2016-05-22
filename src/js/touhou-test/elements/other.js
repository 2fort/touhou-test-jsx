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

const NextButton = ({ steps, activeStep, passedSteps, maxSteps, mutateState, children }) => {
    let color = 'disabled';

    if (activeStep !== passedSteps + 1 && activeStep < maxSteps) {
        const step = steps[activeStep];

        if (step.givenAnswer) {
            color = (step.givenAnswer === step.rightAnswer) ? 'txt-green' : 'txt-red';
        } else {
            color = 'txt-blue';
        }
    }

    return (
        <div className="navigation">
            <button type="button" className={color} id="next" onClick={() => mutateState('GO_NEXT_STEP')}>
               {children}
            </button>
        </div>
    );
};

NextButton.propTypes = {
    steps: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    activeStep: React.PropTypes.number.isRequired,
    passedSteps: React.PropTypes.number.isRequired,
    maxSteps: React.PropTypes.number.isRequired,
    mutateState: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
};

const PrevButton = ({ steps, activeStep, mutateState, children }) => {
    let color = 'disabled';

    if (activeStep !== 1) {
        const step = steps[activeStep - 2];
        color = (step.givenAnswer === step.rightAnswer) ? 'txt-green' : 'txt-red';
    }

    return (
        <div className="navigation">
            <button type="button" className={color} id="prev" onClick={() => mutateState('GO_PREV_STEP')}>
                {children}
            </button>
        </div>
    );
};

PrevButton.propTypes = {
    steps: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    activeStep: React.PropTypes.number.isRequired,
    mutateState: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
};

const TopButtons = ({ steps, passedSteps, activeStep }) => {
    const topButtons = steps.map((step, i) => {
        let color = 'gray';

        if (step.rightAnswer === step.givenAnswer) {
            color = 'green';
        } else if (step.rightAnswer !== step.givenAnswer && step.givenAnswer !== '') {
            color = 'red';
        } else if (i === passedSteps) {
            color = 'blue';
        }

        color += ((i + 1) === activeStep) ? ' active' : '';

        return (
            <div key={i} className={color} id={`step${i + 1}`}>
                &nbsp;
            </div>
        );
    });

    return (
        <div className="topbuttons" id="mytopbuttons">
            {topButtons}
        </div>
    );
};

TopButtons.propTypes = {
    steps: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    passedSteps: React.PropTypes.number.isRequired,
    activeStep: React.PropTypes.number.isRequired,
};

export { NextButton, PrevButton, TopButtons, Navigation };
