import * as testApi from '../api';
import * as types from '../constants/ActionTypes';

const maxSteps = 20;

const initialState = {
    steps: testApi.generateNewTest(maxSteps),
    activeStep: 1,
    modalIsOpen: false,
    maxSteps,
    passedSteps: 0,
};

export default function test(state = initialState, action) {
    switch (action.type) {
        case types.GO_PREV_STEP: {
            if (state.activeStep !== 1) {
                return { ...state, activeStep: state.activeStep - 1 };
            }
            break;
        }
        case types.GO_NEXT_STEP: {
            if (state.activeStep <= state.passedSteps && state.activeStep < maxSteps) {
                return { ...state, activeStep: state.activeStep + 1 };
            }
            break;
        }
        case types.SET_STEP: {
            return { ...state, activeStep: action.stepNumber };
        }
        case types.OPEN_RESULTS_WINDOW: {
            return { ...state, modalIsOpen: true };
        }
        case types.CLOSE_RESULTS_WINDOW: {
            return { ...state, modalIsOpen: false };
        }
        case types.RESET_TEST: {
            const newSteps = testApi.generateNewTest(maxSteps);
            return {
                ...state,
                steps: newSteps,
                activeStep: 1,
                modalIsOpen: false,
                passedSteps: 0,
            };
        }
        case types.ANSWER_GIVEN: {
            const newSteps = state.steps.slice(0);
            newSteps[state.activeStep - 1] = action.step;
            return { ...state, steps: newSteps, passedSteps: state.passedSteps + 1 };
        }
        default: {
            return state;
        }
    }
    return state;
}