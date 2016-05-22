import * as types from '../constants/ActionTypes';

export function goPrevStep() {
    return {
        type: types.GO_PREV_STEP,
    };
}

export function goNextStep() {
    return {
        type: types.GO_NEXT_STEP,
    };
}

export function setStep(stepNumber) {
    return {
        type: types.SET_STEP,
        stepNumber,
    };
}

export function openResultsWindow() {
    return {
        type: types.OPEN_RESULTS_WINDOW,
    };
}

export function closeResultsWindow() {
    return {
        type: types.CLOSE_RESULTS_WINDOW,
    };
}

export function resetTest() {
    return {
        type: types.RESET_TEST,
    };
}

export function answerGiven(step) {
    return {
        type: types.ANSWER_GIVEN,
        step,
    };
}
