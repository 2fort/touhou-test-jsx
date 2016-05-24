import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TestActions from '../actions';

import CharacterImage from '../components/CharacterImage';
import Slider from '../components/Slider';
import MyModal from '../components/MyModal';
import CharacterButtons from '../components/CharacterButtons';
import { NextButton, PrevButton, TopButtons, Navigation } from '../components/other';

const TouhouTest = ({ steps, maxSteps, activeStep, passedSteps, modalIsOpen, actions }) => (
    <div>
        <Navigation resetTest={actions.resetTest} />
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
);


TouhouTest.propTypes = {
    steps: PropTypes.array.isRequired,
    maxSteps: PropTypes.number.isRequired,
    activeStep: PropTypes.number.isRequired,
    passedSteps: PropTypes.number.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    actions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        steps: state.test.steps,
        maxSteps: state.test.maxSteps,
        activeStep: state.test.activeStep,
        passedSteps: state.test.passedSteps,
        modalIsOpen: state.test.modalIsOpen,
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
)(TouhouTest);
