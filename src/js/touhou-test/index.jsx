import React from 'react';
import CharacterImage from './elements/CharacterImage';
import Slider from './elements/Slider';
import MyModal from './elements/MyModal';
import CharacterButtons from './elements/CharacterButtons';
import { NextButton, PrevButton, TopButtons, Navigation } from './elements/other';

export default class TouhouTest extends React.Component {
    constructor(props) {
        super(props);
        Object.assign(this, props);

        this.characters = this.data.map(char => ({ name: char.name, imgurl: char.imgurl }));

        this.init = this.init.bind(this);
        this.mutateState = this.mutateState.bind(this);

        this.init();
    }

    init() {
        const tempCharacters = this.characters.slice(0);
        this.steps = [];

        for (let st = 1; st <= 20; st++) {
            let rndCharacterPosition = this.randomNumber(tempCharacters.length);
            const rndCharacter = tempCharacters[rndCharacterPosition];
            const buttonsArray = tempCharacters.map(item => item.name);

            const oneStep = {
                step: st,
                image: rndCharacter.imgurl,
                passed: false,
                buttons: [rndCharacter.name],
                rightAnswer: rndCharacter.name,
                givenAnswer: '',
            };

            tempCharacters.splice(rndCharacterPosition, 1);
            buttonsArray.splice(buttonsArray.indexOf(oneStep.rightAnswer), 1);

            for (let i = 1; i <= 4; i++) {
                rndCharacterPosition = this.randomNumber(buttonsArray.length);
                oneStep.buttons[i] = buttonsArray[rndCharacterPosition];
                buttonsArray.splice(rndCharacterPosition, 1);
            }

            for (let i = oneStep.buttons.length - 1; i > 0; i -= 1) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = oneStep.buttons[i];
                oneStep.buttons[i] = oneStep.buttons[j];
                oneStep.buttons[j] = temp;
            }

            this.steps.push(oneStep);
        }

        if (!this.context) {
            this.state = {
                activeStep: 1,
                modalIsOpen: false,
            };
        } else {
            this.setState({
                activeStep: 1,
                modalIsOpen: false,
            });
        }
    }

    get passedSteps() {
        return this.steps.filter(step => step.passed === true).length;
    }

    randomNumber(scopeLength) {
        return Math.floor(Math.random() * scopeLength);
    }

    mutateState(action, payload) {
        switch (action) {
            case 'GO_PREV_STEP': {
                if (this.state.activeStep !== 1) {
                    this.setState({ activeStep: this.state.activeStep - 1 });
                }
                break;
            }
            case 'GO_NEXT_STEP': {
                if (this.state.activeStep <= this.passedSteps &&
                    this.state.activeStep < this.maxSteps) {
                    this.setState({ activeStep: this.state.activeStep + 1 });
                }
                break;
            }
            case 'SET_STEP': {
                this.setState({ activeStep: payload });
                break;
            }
            case 'OPEN_RESULTS_WINDOW': {
                this.setState({ modalIsOpen: true });
                break;
            }
            case 'CLOSE_RESULTS_WINDOW': {
                this.setState({ modalIsOpen: false });
                break;
            }
            default: {
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <Navigation reset={this.init} />
                <Slider
                  mutateState={this.mutateState}
                  passedSteps={this.passedSteps}
                  maxSteps={this.maxSteps}
                  step={this.state.activeStep}
                />
                <TopButtons
                  steps={this.steps}
                  passedSteps={this.passedSteps}
                  activeStep={this.state.activeStep}
                />

                <div className="test">
                    <PrevButton
                      steps={this.steps}
                      activeStep={this.state.activeStep}
                      mutateState={this.mutateState}
                    >
                      &nbsp;&lt;&nbsp;
                    </PrevButton>

                    <CharacterImage
                      image={this.steps[this.state.activeStep - 1].image}
                    />

                    <CharacterButtons
                      currentStep={this.steps[this.state.activeStep - 1]}
                      mutateState={this.mutateState}
                      maxSteps={this.maxSteps}
                    />

                    <NextButton
                      steps={this.steps}
                      activeStep={this.state.activeStep}
                      passedSteps={this.passedSteps}
                      maxSteps={this.maxSteps}
                      mutateState={this.mutateState}
                    >
                        &nbsp;&gt;&nbsp;
                    </NextButton>
                </div>

                <MyModal
                  open={this.state.modalIsOpen}
                  mutateState={this.mutateState}
                  reset={this.init}
                  steps={this.steps}
                />
            </div>
        );
    }
}

TouhouTest.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    maxSteps: React.PropTypes.number.isRequired,
};
