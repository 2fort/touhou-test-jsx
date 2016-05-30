import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import * as TestActions from '../actions/testActions';
import CharacterImage from '../components/Test/CharacterImage';
import Slider from '../components/Test/Slider';
import MyModal from '../components/Test/MyModal';
import CharacterButtons from '../components/Test/CharacterButtons';
import { NextButton, PrevButton, TopButtons } from '../components/Test/other';

class Test extends Component {
    componentWillMount() {
        this.props.actions.showResetButton();

        if (!this.props.inProgress) {
            this.props.actions.beginTest();
        }
    }
    componentWillUnmount() {
        this.props.actions.hideResetButton();
    }
    render() {
        let { steps, maxSteps, activeStep, passedSteps, modalIsOpen, actions } = this.props;

        if (!this.props.inProgress) {
            return null;
        }

        return (
            <DocumentTitle title="Test x20 | Touhou">
                <div>
                    <Slider
                      setStep={actions.setStep}
                      passedSteps={passedSteps}
                      maxSteps={maxSteps}
                      step={activeStep}
                    />
                    <TopButtons
                      steps={steps}
                      passedSteps={passedSteps}
                      activeStep={activeStep}
                    />

                    <div className="test">
                        <PrevButton
                          steps={steps}
                          activeStep={activeStep}
                          goPrevStep={actions.goPrevStep}
                        >
                          &nbsp;&lt;&nbsp;
                        </PrevButton>

                        <CharacterImage
                          image={steps[activeStep - 1].image}
                        />

                        <CharacterButtons
                          currentStep={Object.assign({}, steps[activeStep - 1])}
                          actions={actions}
                          maxSteps={maxSteps}
                        />

                        <NextButton
                          steps={steps}
                          activeStep={activeStep}
                          passedSteps={passedSteps}
                          maxSteps={maxSteps}
                          goNextStep={actions.goNextStep}
                        >
                            &nbsp;&gt;&nbsp;
                        </NextButton>
                    </div>

                    <MyModal
                      open={modalIsOpen}
                      actions={actions}
                      steps={steps}
                    />
                </div>
            </DocumentTitle>
        ); }
}

Test.propTypes = {
    steps: PropTypes.array,
    maxSteps: PropTypes.number,
    activeStep: PropTypes.number,
    passedSteps: PropTypes.number,
    modalIsOpen: PropTypes.bool,
    inProgress: PropTypes.bool.isRequired,
    actions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        steps: state.test.steps,
        maxSteps: state.test.maxSteps,
        activeStep: state.test.activeStep,
        passedSteps: state.test.passedSteps,
        modalIsOpen: state.test.modalIsOpen,
        inProgress: state.test.inProgress,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TestActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);
