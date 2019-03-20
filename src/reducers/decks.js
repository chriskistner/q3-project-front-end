import {GET_DECKS} from '../actions/decks.js';

const initialState = [

  ];

export default function decks (state = initialState, action) {
    switch(action.type) {
        case GET_DECKS: 
            return action.payload

        default:
            return state
    }
};
