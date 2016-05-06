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

class CharacterImage extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.image !== this.props.image) {
            return true;
        }
        return false;
    }
    render() {
        let img = require('../../../images/scale/' + this.props.image);
        return(
            <div className="character">
                <img key={img} alt="character" src={img} />
            </div>
        )
    }
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
        this.props.changeStep(e.target.value - 1);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.step});
    }
    render() {
        return (
            <div className="myslider">
                <div className="inside"> 
                    <input 
                        onInput={this.handleInput} 
                        type="range" min="1" max={this.props.maxStep} step="1" 
                        value={this.state.value} className={'width-' + this.props.maxStep} 
                    />
                </div>
            </div>
        )
    }
}

export { NextButton, PrevButton, CharacterImage, CharacterButtons, TopButtons, Slider }
