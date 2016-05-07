import React from 'react';

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.step };

        this.handleInput = this.handleInput.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.step });
    }
    handleInput(e) {
        e.preventDefault();
        this.setState({ value: e.target.value });
        this.props.changeStep(e.target.value - 1);
    }
    render() {
        return (
            <div className="myslider">
                <div className="inside">
                    <input
                      onInput={this.handleInput}
                      type="range" min="1" max={this.props.maxStep} step="1"
                      value={this.state.value} className={`width-${this.props.maxStep}`}
                    />
                </div>
            </div>
        );
    }
}

Slider.propTypes = {
    step: React.PropTypes.number.isRequired,
    maxStep: React.PropTypes.number.isRequired,
    changeStep: React.PropTypes.func.isRequired,
};
