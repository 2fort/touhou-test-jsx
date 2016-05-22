import React from 'react';
import CharacterImage from './elements/CharacterImage';
import Slider from './elements/Slider';
import MyModal from './elements/MyModal';
import CharacterButtons from './elements/CharacterButtons';
import { NextButton, PrevButton, TopButtons, Navigation } from './elements/other';
import * as testApi from './api';

export default class TouhouTest extends React.Component {
    constructor(props) {
        super(props);
        this.maxSteps = props.maxSteps;

        this.mutateState = this.mutateState.bind(this);

        this.steps = testApi.generateNewTest(this.maxSteps);

        this.state = {
            activeStep: 1,
            modalIsOpen: false,
        };
    }

    get passedSteps() {
        return this.steps.filter(step => step.passed === true).length;
    }

    mutateState(action, payload) {
        switch (action) {
            case 'GO_PREV_STEP': {
                if (this.state.activeStep !== 1) {
                    this.setState({ activeStep: this.state.activeStep - 1 });
                }
                break;
            }
            case 'GO_NEXT_STEP': {
                if (this.state.activeStep <= this.passedSteps &&
                    this.state.activeStep < this.maxSteps) {
                    this.setState({ activeStep: this.state.activeStep + 1 });
                }
                break;
            }
            case 'SET_STEP': {
                const newState = Object.assign({}, this.state, payload);
                this.setState(newState);
                break;
            }
            case 'OPEN_RESULTS_WINDOW': {
                this.setState({ modalIsOpen: true });
                break;
            }
            case 'CLOSE_RESULTS_WINDOW': {
                this.setState({ modalIsOpen: false });
                break;
            }
            case 'RESET_TEST': {
                this.steps = testApi.generateNewTest(this.maxSteps);
                this.setState({
                    activeStep: 1,
                    modalIsOpen: false,
                });
                break;
            }
            default: {
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <Navigation mutateState={this.mutateState} />
                <Slider
                  mutateState={this.mutateState}
                  passedSteps={this.passedSteps}
                  maxSteps={this.maxSteps}
                  step={this.state.activeStep}
                />
                <TopButtons
                  steps={this.steps}
                  passedSteps={this.passedSteps}
                  activeStep={this.state.activeStep}
                />

                <div className="test">
                    <PrevButton
                      steps={this.steps}
                      activeStep={this.state.activeStep}
                      mutateState={this.mutateState}
                    >
                      &nbsp;&lt;&nbsp;
                    </PrevButton>

                    <CharacterImage
                      image={this.steps[this.state.activeStep - 1].image}
                    />

                    <CharacterButtons
                      currentStep={this.steps[this.state.activeStep - 1]}
                      mutateState={this.mutateState}
                      maxSteps={this.maxSteps}
                    />

                    <NextButton
                      steps={this.steps}
                      activeStep={this.state.activeStep}
                      passedSteps={this.passedSteps}
                      maxSteps={this.maxSteps}
                      mutateState={this.mutateState}
                    >
                        &nbsp;&gt;&nbsp;
                    </NextButton>
                </div>

                <MyModal
                  open={this.state.modalIsOpen}
                  mutateState={this.mutateState}
                  steps={this.steps}
                />
            </div>
        );
    }
}

TouhouTest.propTypes = {
    maxSteps: React.PropTypes.number.isRequired,
};
