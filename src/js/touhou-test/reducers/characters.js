import * as testApi from '../api';
import * as types from '../constants/ActionTypes';

const maxChar = 5;

const initialState = {
    inProgress: false,
    maxChar,
};

export default function characters(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_ALL_GAMES: {
            const games = testApi.getAllGames();
            const gamesWithChars = '';
            return {
                ...state,
                inProgress: true,
                games,
            };
        }

        default: {
            return state;
        }
    }

    return state;
}
