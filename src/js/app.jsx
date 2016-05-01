require('../sass/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { Characters } from './json/characters.js';
import OneStep from './classes/OneStep.js';

class PrevButton extends React.Component{
    render() {
        return (
            <div className="navigation">
                <button type="button" id="prev" className={this.props.color} onClick={() => this.props.changeStep('prev')}>
                    <span>&nbsp;&lt;&nbsp;</span>
                </button>
            </div>
        )
    }
};

class NextButton extends React.Component{
    render() {
        return (
            <div className="navigation">
                <button type="button" id="next" className={this.props.color} onClick={() => this.props.changeStep('next')}>
                    <span>&nbsp;&gt;&nbsp;</span>
                </button>
            </div>
        )
    }
};

class CharacterImage extends React.Component{
    render() {
        return (
            <div className="character">
                <img alt="character" 
                    id="character-image" 
                    src={"src/images/scale/" + this.props.image}
                />
            </div>
        )
    }
};

class CharacterButtons extends React.Component{
    render() {
        let buttons = this.props.buttons.map((btn, i) => {
            return (
                <button type="button" key={i} className={btn.color} id={'option' + (i + 1)} onClick={this.props.checkAnswer}>
                    {btn.name}
                </button>
            );
        });
        return (
            <div className="buttons">
                {buttons}
            </div>
        )
    }
};

class TouhouTest extends React.Component{
    constructor(props) {
        super(props);
        this.characters = props.characters;
        this.maxSteps = props.maxSteps;
        this.charactersWoUsed = this.characters.slice(0);
        this.charactersWoSolved = this.characters.map(item => { return item.name; });
        this.steps = [];
        
        this.steps.push(new OneStep(1));
        this.fillStep(this.steps[0]);
        
        this.state = { 
            currentStep: this.steps[0]
        };
        
        this.checkAnswer = this.checkAnswer.bind(this);
        this.changeStep = this.changeStep.bind(this);
    }
    
    randomNumber(scopeLength) {
        return Math.floor(Math.random() * scopeLength);
    }
    
    fillStep (oneStep) {
        let rndCharacterPosition = this.randomNumber(this.charactersWoUsed.length);
        let rndCharacter = this.charactersWoUsed[rndCharacterPosition];

        let buttonsArray = this.charactersWoSolved.slice(0);

        oneStep.buttons[0] = { name: rndCharacter.name, color: OneStep.buttonColor('blue') };
        oneStep.rightAnswer = rndCharacter.name;
        oneStep.image = rndCharacter.imgurl;

        this.charactersWoUsed.splice(rndCharacterPosition, 1);
        buttonsArray.splice(buttonsArray.indexOf(oneStep.rightAnswer), 1);

        for (let i = 1; i <= 4; i++) {
            rndCharacterPosition = this.randomNumber(buttonsArray.length);
            oneStep.buttons[i] = { name: buttonsArray[rndCharacterPosition], color: OneStep.buttonColor('blue') };
            buttonsArray.splice(rndCharacterPosition, 1);
        }

        oneStep.shuffle();
    }
    
    checkAnswer (e) {
        e.preventDefault();
        
        let answerChar = e.target.innerText;

        if (this.state.currentStep.passed === true) {
            return;
        }

        if (this.state.currentStep.step <= 20) {
            this.state.currentStep.passed = true;
            this.state.currentStep.givenAnswer = answerChar;

            if (this.state.currentStep.rightAnswer === answerChar) {
                this.charactersWoSolved.splice(this.charactersWoSolved.indexOf(answerChar), 1);
            }

            this.state.currentStep.repaintButtons();
            this.setState(this.state);
        }
        
        if (this.state.currentStep.step < 20) { 
            let length = this.steps.push(new OneStep(this.state.currentStep.step + 1));
            this.fillStep(this.steps[length - 1]);
        
            window.setTimeout(() => {
                this.setState({currentStep: this.steps[length - 1]})
            }, 850);
        } else {
            let correctAnswers = this.steps.filter(step => step.rightAnswer === step.givenAnswer).length;
            let incorrectAnswers = this.steps.filter(step => step.rightAnswer !== step.givenAnswer).length;
            console.log(correctAnswers);
            console.log(incorrectAnswers);
        }
    }
    changeStep(where) {
        switch(where) {
            case 'prev': {
                this.setState({currentStep: this.steps[this.state.currentStep.step - 2]});
                break;
            }
            case 'next': {
                this.setState({currentStep: this.steps[this.state.currentStep.step]});
                break;
            }
        }
    }
    prevButtonData() {
        let color = '';
        let func = this.changeStep;
        
        if (this.state.currentStep.step === 1)  {
            color = 'disabled';
            func = () => null;
        } else {
            let step = this.steps[this.state.currentStep.step - 2];
            color = (step.givenAnswer === step.rightAnswer) ? 'green' : 'red';
        }
        return {color, func}
    }
    nextButtonData() {
        let color = '';
        let func = this.changeStep;
        
        if (this.state.currentStep.step !== this.steps.length && this.state.currentStep.step < this.maxSteps) {
            let step = this.steps[this.state.currentStep.step];

            if (step.givenAnswer) {
                color = (step.givenAnswer === step.rightAnswer) ? 'green' : 'red';
            } else {
                color = 'blue';
            }
        } else {
            color = 'disabled';
            func = () => null;
        }
        
        return {color, func}
    }
    render () {
        let prevButtonData = this.prevButtonData();
        let nextButtonData = this.nextButtonData();
        
        return (
            <div className="content">
                <PrevButton 
                    changeStep={prevButtonData.func} 
                    color={prevButtonData.color}
                />
                <CharacterImage 
                    image={this.state.currentStep.image} 
                />
                <CharacterButtons 
                    checkAnswer={this.checkAnswer} 
                    buttons={this.state.currentStep.buttons} 
                />
                <NextButton 
                    changeStep={nextButtonData.func} 
                    color={nextButtonData.color}
                />
            </div>
        );
    }
};

ReactDOM.render(
    <TouhouTest characters={Characters} maxSteps={20} />,
    document.getElementById('touhou')
);
