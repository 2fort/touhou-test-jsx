import React from 'react';

const NextButton = (props) => (
    <div className="navigation">
        <button type="button" className={props.color} id="next" onClick={() => props.changeStep('next')}>
           &nbsp;&gt;&nbsp;
        </button>
    </div>
);

const PrevButton = (props) => (
    <div className="navigation">
        <button type="button" className={props.color} id="prev" onClick={() => props.changeStep('prev')}>
            &nbsp;&lt;&nbsp;
        </button>
    </div>
);

const CharacterImage = (props) => {
    let img = require('../../../images/scale/' + props.image);
    return (
        <div className="character">
            <img alt="character" src={img} />
        </div>
    );
}

const CharacterButtons = (props) => {
    let buttons = props.buttons.map((btn, i) => {
        return (
            <button type="button" key={i} className={btn.color} id={'option' + (i + 1)} onClick={props.checkAnswer}>
                {btn.name}
            </button>
        );
    });
    return (<div className="buttons">{buttons}</div>)
}

const TopButtons = (props) => {
    let topButtons = props.data.map((topbtn, i) => {
        return (
            <div key={i} className={topbtn} id={'step' + (i+1)}> 
                &nbsp;
            </div>
        );
    });
    return (
        <div className="topbuttons" id="mytopbuttons">
            {topButtons}
        </div>
    )
};

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.step};
        
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        e.preventDefault();
        this.setState({value: e.target.value});
        console.log("event step: " + e.target.value);
        
        this.props.changeStep(e.target.value - 1);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.step});
        console.log("nextProps step: " + nextProps.step);
    }
    render() {
        console.log("props step: " + this.props.step);
        console.log("state step: " + this.state.value);
        return (
            <div className="myslider" id="slider">
                <div className="inside">
                    <input 
                        onInput={this.handleInput} 
                        type="range" min="1" max={this.props.maxStep} step="1" id="myslider" 
                        value={this.state.value} className={'width-' + this.props.maxStep} 
                    />
                </div>
            </div>
        )
    }
}

export { NextButton, PrevButton, CharacterImage, CharacterButtons, TopButtons, Slider }
