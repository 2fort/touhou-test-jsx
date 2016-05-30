import React, { Component, PropTypes } from 'react';

export default class CharacterButtons extends Component {
    handleAnswer(answerChar) {
        const { actions, currentStep, maxSteps } = this.props;

        currentStep.passed = true;
        currentStep.givenAnswer = answerChar;

        actions.answerGiven(currentStep);
        actions.setStep(currentStep.step);

        setTimeout(() => {
            if (currentStep.step === maxSteps) {
                actions.openResultsWindow();
            } else {
                actions.goNextStep();
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
                      if (!currentStep.passed) {
                          e.preventDefault();
                          this.handleAnswer(e.target.innerText);
                      }
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
    currentStep: PropTypes.shape({
        step: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        passed: PropTypes.bool.isRequired,
        buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
        rightAnswer: PropTypes.string.isRequired,
        givenAnswer: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.object.isRequired,
    maxSteps: PropTypes.number.isRequired,
};
