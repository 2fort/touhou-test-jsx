import React from 'react';

export default class CharacterButtons extends React.Component {
    handleAnswer(answerChar) {
        const { mutateState, currentStep, maxSteps } = this.props;

        if (currentStep.passed === true) {
            return;
        }

        console.log(currentStep.step);

        if (currentStep.step <= maxSteps) {
            currentStep.passed = true;
            currentStep.givenAnswer = answerChar;
        }

        mutateState('SET_STEP', currentStep.step);

        window.setTimeout(() => {
            if (currentStep.step === maxSteps) {
                mutateState('OPEN_RESULTS_WINDOW');
            } else {
                mutateState('GO_NEXT_STEP');
            }
        }, 850);
    }

    render() {
        const { currentStep } = this.props;

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
                <button
                  type="button"
                  key={i}
                  className={color}
                  onClick={e => {
                      e.preventDefault();
                      this.handleAnswer(e.target.innerText);
                  }}
                >
                    {name}
                </button>
            );
        });

        return (<div className="buttons">{charButtons}</div>);
    }
}

CharacterButtons.propTypes = {
    currentStep: React.PropTypes.shape({
        step: React.PropTypes.number.isRequired,
        image: React.PropTypes.string.isRequired,
        passed: React.PropTypes.bool.isRequired,
        buttons: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        rightAnswer: React.PropTypes.string.isRequired,
        givenAnswer: React.PropTypes.string.isRequired,
    }).isRequired,
    mutateState: React.PropTypes.func.isRequired,
    maxSteps: React.PropTypes.number.isRequired,
};
