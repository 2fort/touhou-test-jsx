import React from 'react';
import Modal from 'react-modal';
import OneStep from '../classes/one-step.js';

export default class MyModal extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.open !== this.props.open) {
            return true;
        }
        return false;
    }
    render() {
        if (this.props.open === false) {
            return false;
        }

        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            },
        };

        let correctAnswers = this.props.steps.filter(step => step.rightAnswer === step.givenAnswer).length;
        let incorrectAnswers = this.props.steps.filter(step => step.rightAnswer !== step.givenAnswer).length;

        return (
            <Modal isOpen={this.props.open} style={customStyles} onRequestClose={this.props.close} >
                <div className="my-modal">
                    <h2>Результаты:</h2>
                    <span className="correct">правильных ответов: {correctAnswers}</span> <br />
                    <span className="incorrect">неправильных ответов: {incorrectAnswers}</span> <br />
                    <button className="green btn-left" onClick={this.props.reset}>Еще раз!</button>
                    <button className="blue btn-right" onClick={this.props.close}>Закрыть</button>
                </div>
            </Modal>
        );
    }
}

MyModal.propTypes = {
    open: React.PropTypes.bool.isRequired,
    steps: React.PropTypes.arrayOf(React.PropTypes.instanceOf(OneStep)).isRequired,
    reset: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
};
