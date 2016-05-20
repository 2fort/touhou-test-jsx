import React from 'react';
import CharacterImage from './elements/character-image';
import Slider from './elements/slider';
import MyModal from './elements/my-modal';
import { NextButton, PrevButton, CharacterButtons, TopButtons, Navigation } from './elements/other';

export default class TouhouTest extends React.Component {
    constructor(props) {
        super(props);
        Object.assign(this, props);

        this.checkAnswer = this.checkAnswer.bind(this);
        this.changeStep = this.changeStep.bind(this);
        this.init = this.init.bind(this);
        this.reset = this.reset.bind(this);

        this.init();
        this.state = { currentStep: this.steps[0], modalIsOpen: false };
    }

    init() {
        this.characters = this.data.map(char => ({ name: char.name, imgurl: char.imgurl }));
        this.steps = [];

        const nextStep = this.fillStep(1, this.characters);
        this.steps.push(nextStep);
    }

    reset() {
        this.init();
        this.setState({ currentStep: this.steps[0], modalIsOpen: false });
    }

    randomNumber(scopeLength) {
        return Math.floor(Math.random() * scopeLength);
    }

    fillStep(step, characters) {
        let rndCharacterPosition = this.randomNumber(characters.length);
        const rndCharacter = characters[rndCharacterPosition];
        const buttonsArray = characters.map(item => item.name);

        const oneStep = {
            step,
            image: rndCharacter.imgurl,
            passed: false,
            buttons: [rndCharacter.name],
            rightAnswer: rndCharacter.name,
            givenAnswer: '',
        };

        characters.splice(rndCharacterPosition, 1);
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

        return oneStep;
    }

    checkAnswer(e) {
        e.preventDefault();

        const answerChar = e.target.innerText;

        if (this.state.currentStep.passed === true) {
            return;
        }

        if (this.state.currentStep.step <= this.maxSteps) {
            this.state.currentStep.passed = true;
            this.state.currentStep.givenAnswer = answerChar;

            this.setState(this.state);
        }

        if (this.state.currentStep.step < this.maxSteps) {
            const nextStep = this.fillStep(this.steps.length + 1, this.characters);
            this.steps.push(nextStep);

            window.setTimeout(() => {
                this.setState({ currentStep: this.steps[this.steps.length - 1] });
            }, 850);
        } else {
            window.setTimeout(() => {
                this.setState({ modalIsOpen: true });
            }, 850);
        }
    }

    changeStep(where) {
        switch (where) {
            case 'prev': {
                this.setState({ currentStep: this.steps[this.state.currentStep.step - 2] });
                break;
            }
            case 'next': {
                this.setState({ currentStep: this.steps[this.state.currentStep.step] });
                break;
            }
            default: {
                this.setState({ currentStep: this.steps[where] });
                break;
            }
        }
    }

    navButtonsData(button) {
        let color = '';
        let changeStep = this.changeStep;

        switch (button) {
            case 'prev': {
                if (this.state.currentStep.step === 1) {
                    color = 'disabled';
                    changeStep = () => null;
                } else {
                    const step = this.steps[this.state.currentStep.step - 2];
                    color = (step.givenAnswer === step.rightAnswer) ? 'txt-green' : 'txt-red';
                }
                break;
            }
            case 'next': {
                if (this.state.currentStep.step !== this.steps.length && this.state.currentStep.step < this.maxSteps) {
                    const step = this.steps[this.state.currentStep.step];

                    if (step.givenAnswer) {
                        color = (step.givenAnswer === step.rightAnswer) ? 'txt-green' : 'txt-red';
                    } else {
                        color = 'txt-blue';
                    }
                } else {
                    color = 'disabled';
                    changeStep = () => null;
                }
                break;
            }
            default: {
                break;
            }
        }

        return { color, changeStep };
    }

    topButtonsData() {
        const topButtons = this.steps.map(step => {
            if (step.rightAnswer === step.givenAnswer) {
                return 'green';
            } else if (step.rightAnswer !== step.givenAnswer && step.givenAnswer !== '') {
                return 'red';
            }
            return 'blue';
        });

        const temp = this.maxSteps - topButtons.length;

        if (topButtons.length <= this.maxSteps - 1) {
            for (let i = 0; i < temp; i++) {
                topButtons.push('gray');
            }
        }

        topButtons[this.state.currentStep.step - 1] += ' active';

        return topButtons;
    }

    render() {
        return (
            <div>
                <Navigation reset={this.reset} />
                <Slider changeStep={this.changeStep} maxStep={this.steps.length} step={this.state.currentStep.step} />
                <TopButtons data={this.topButtonsData()} />

                <div className="test">
                    <PrevButton {...this.navButtonsData('prev')}> &nbsp;&lt;&nbsp; </PrevButton>
                    <CharacterImage image={this.state.currentStep.image} />
                    <CharacterButtons checkAnswer={this.checkAnswer} currentStep={this.state.currentStep} />
                    <NextButton {...this.navButtonsData('next')}> &nbsp;&gt;&nbsp; </NextButton>
                </div>

                <MyModal
                  open={this.state.modalIsOpen}
                  close={() => this.setState({ modalIsOpen: false })}
                  reset={this.reset} steps={this.steps}
                />
            </div>
        );
    }
}

TouhouTest.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    maxSteps: React.PropTypes.number,
};
