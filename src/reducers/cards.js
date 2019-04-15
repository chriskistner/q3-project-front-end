import {SEARCH_CARDS, GENERATE_PAGE} from '../actions/cards.js';

const initialState = {
    searchCards: [],
    pageCards: [],
    currentPage: 1


}

export default function cards (state = initialState, action) {
    switch(action.type) {
        case SEARCH_CARDS: 
            return {...state, searchCards: action.payload}
        case GENERATE_PAGE:
            return {...state, pageCards: action.payload}
        default:
            return state
    }
}
