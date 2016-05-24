import React from 'react';

export default class CharacterButtons extends React.Component {
    handleAnswer(answerChar) {
        const { actions, currentStep, maxSteps } = this.props;

        currentStep.passed = true;
        currentStep.givenAnswer = answerChar;

        actions.answerGiven(currentStep);
        actions.setStep(currentStep.step);

        window.setTimeout(() => {
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
    currentStep: React.PropTypes.shape({
        step: React.PropTypes.number.isRequired,
        image: React.PropTypes.string.isRequired,
        passed: React.PropTypes.bool.isRequired,
        buttons: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        rightAnswer: React.PropTypes.string.isRequired,
        givenAnswer: React.PropTypes.string.isRequired,
    }).isRequired,
    actions: React.PropTypes.object.isRequired,
    maxSteps: React.PropTypes.number.isRequired,
};
