import {SEARCH_CARDS, GENERATE_PAGE, GENERATE_PAGE_TOTAL, PAGE_PLUS} from '../actions/cards.js';

const initialState = {
    searchCards: [],
    pageCards: [],
    totalPages: 1,
    currentPage: 1,
    pageStart: 0
};

export default function cards (state = initialState, action) {
    switch(action.type) {
        case SEARCH_CARDS: 
            return {...state, searchCards: action.payload}
        case GENERATE_PAGE_TOTAL:
            return {...state, totalPages: action.payload}
            case PAGE_PLUS:
                return {...state, currentPage: action.payload.newPage, pageStart: action.payload.pageStart}
        case GENERATE_PAGE:
            return {...state, pageCards: action.payload}
        default:
            return state
    }
}
