import React from 'react';
import Modal from 'react-modal';

export default class MyModal extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.open !== this.props.open) {
            return true;
        }
        return false;
    }
    render() {
        const { open, steps, mutateState } = this.props;

        if (open === false) {
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

        let correctAnswers = steps.filter(step => step.rightAnswer === step.givenAnswer).length;
        let incorrectAnswers = steps.filter(step => step.rightAnswer !== step.givenAnswer).length;

        return (
            <Modal isOpen={open} style={customStyles} onRequestClose={() => mutateState('CLOSE_RESULTS_WINDOW')} >
                <div className="my-modal">
                    <h2>Результаты:</h2>
                    <span className="correct">правильных ответов: {correctAnswers}</span> <br />
                    <span className="incorrect">неправильных ответов: {incorrectAnswers}</span> <br />
                    <button className="green btn-left" onClick={() => mutateState('RESET_TEST')}>Еще раз!</button>
                    <button className="blue btn-right" onClick={() => mutateState('CLOSE_RESULTS_WINDOW')}>Закрыть</button>
                </div>
            </Modal>
        );
    }
}

MyModal.propTypes = {
    open: React.PropTypes.bool.isRequired,
    steps: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    mutateState: React.PropTypes.func.isRequired,
};
