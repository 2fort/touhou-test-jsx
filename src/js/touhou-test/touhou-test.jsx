import React from 'react';

import OneStep from './classes/one-step.js';
import { NextButton, PrevButton, CharacterImage, CharacterButtons, TopButtons, Slider, Navigation, MyModal } from './elements/elements.js';

export default class TouhouTest extends React.Component{
    constructor(props) {
        super(props);
        this.data = props.characters;
        this.maxSteps = props.maxSteps;
        
        this.checkAnswer = this.checkAnswer.bind(this);
        this.changeStep = this.changeStep.bind(this);
        this.init = this.init.bind(this);
        this.reset = this.reset.bind(this);
        
        this.init();
        this.state = { currentStep: this.steps[0], modalIsOpen: false };
    }
    
    init() {
        this.characters = this.data.map((char) => { return { name: char.name, imgurl: char.imgurl }});
        this.steps = [];
        this.steps.push(new OneStep(1));
        this.fillStep(this.steps[0]);
    }
    
    reset() {
        this.init();
        this.setState({ currentStep: this.steps[0], modalIsOpen: false });
    }
    
    randomNumber(scopeLength) {
        return Math.floor(Math.random() * scopeLength);
    }
    
    fillStep (oneStep) {
        let rndCharacterPosition = this.randomNumber(this.characters.length);
        let rndCharacter = this.characters[rndCharacterPosition];

        let buttonsArray = this.characters.map(item => item.name);

        oneStep.buttons[0] = { name: rndCharacter.name, color: 'blue' };
        oneStep.rightAnswer = rndCharacter.name;
        oneStep.image = rndCharacter.imgurl;

        this.characters.splice(rndCharacterPosition, 1);
        buttonsArray.splice(buttonsArray.indexOf(oneStep.rightAnswer), 1);

        for (let i = 1; i <= 4; i++) {
            rndCharacterPosition = this.randomNumber(buttonsArray.length);
            oneStep.buttons[i] = { name: buttonsArray[rndCharacterPosition], color: 'blue' };
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

        if (this.state.currentStep.step <= this.maxSteps) {
            this.state.currentStep.passed = true;
            this.state.currentStep.givenAnswer = answerChar;

            this.state.currentStep.repaintButtons();
            this.setState(this.state);
        }
        
        if (this.state.currentStep.step < this.maxSteps) { 
            let length = this.steps.push(new OneStep(this.state.currentStep.step + 1));
            this.fillStep(this.steps[length - 1]);
        
            window.setTimeout(() => {
                this.setState({currentStep: this.steps[length - 1]})
            }, 850);
        } else {
            this.setState({modalIsOpen: true});
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
            default: {
                this.setState({currentStep: this.steps[where]});
                break;
            }
        }
    }
    navButtonsData(button) {
        let color = '';
        let func = this.changeStep;
        
        switch (button) {
            case 'prev': {
                if (this.state.currentStep.step === 1)  {
                    color = 'disabled';
                    func = () => null;
                } else {
                    let step = this.steps[this.state.currentStep.step - 2];
                    color = (step.givenAnswer === step.rightAnswer) ? 'txt-green' : 'txt-red';
                }
                break;
            }
            case 'next': {
                if (this.state.currentStep.step !== this.steps.length && this.state.currentStep.step < this.maxSteps) {
                    let step = this.steps[this.state.currentStep.step];

                    if (step.givenAnswer) {
                        color = (step.givenAnswer === step.rightAnswer) ? 'txt-green' : 'txt-red';
                    } else {
                        color = 'txt-blue';
                    }
                } else {
                    color = 'disabled';
                    func = () => null;
                } 
                break;
            }
        }
        
        return {color, func}
    }
    topButtonsData() {
        let topButtons = this.steps.map((step, i) => {
            if (step.rightAnswer === step.givenAnswer) {
                return 'green'
            } else if (step.rightAnswer !== step.givenAnswer && step.givenAnswer !== '') {
                return 'red'
            } else if (step.givenAnswer == '') {
                return 'blue'
            }
        })
        
        const temp = this.maxSteps - topButtons.length;
        
        if (topButtons.length <= this.maxSteps - 1) {
            for (let i = 0; i < temp; i++) {
                topButtons.push('gray');
            }
        }
        
        topButtons[this.state.currentStep.step - 1] += ' active'; 
        
        return topButtons;
    }
    render () {
        let prevButtonData = this.navButtonsData('prev');
        let nextButtonData = this.navButtonsData('next');
        let topButtonsData = this.topButtonsData();
        
        return (
            <div>
                <Navigation reset={this.reset} />
                <Slider changeStep={this.changeStep} maxStep={this.steps.length} step={this.state.currentStep.step} />
                <TopButtons data={topButtonsData} />
                
                <div className="test">
                    <PrevButton changeStep={prevButtonData.func} color={prevButtonData.color} />
                    <CharacterImage image={this.state.currentStep.image} />
                    <CharacterButtons checkAnswer={this.checkAnswer} buttons={this.state.currentStep.buttons} />
                    <NextButton changeStep={nextButtonData.func} color={nextButtonData.color} />
                </div>
                
                <MyModal 
                    open={this.state.modalIsOpen} 
                    close={() => {return this.setState({modalIsOpen: false})}} 
                    reset={this.reset} steps={this.steps}
                />
            </div>
        );
    }
};
