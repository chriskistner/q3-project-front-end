import {SEARCH_CARDS, GENERATE_PAGE, GENERATE_PAGE_TOTAL, PAGE_PLUS, PAGE_MINUS, PAGE_RESET} from '../actions/cards.js';

const initialState = {
    searchCards: [],
    pageCards: [],
    totalPages: 1,
    currentPage: 1,
    cardStart: 0
};

export default function cards (state = initialState, action) {
    switch(action.type) {
        case SEARCH_CARDS: 
            return {...state, searchCards: action.payload};

        case GENERATE_PAGE_TOTAL:
            return {...state, totalPages: action.payload};

        case PAGE_PLUS:
            return {...state, currentPage: action.payload.newPage, cardStart: action.payload.cardStart};

        case PAGE_MINUS:
            return {...state, currentPage: action.payload.newPage, cardStart: action.payload.cardStart};

        case PAGE_RESET:
            return {...state, searchCards: [], pageCards: [], totalPages: 1, currentPage: 1, cardStart: 0}
        
        case GENERATE_PAGE:
            return {...state, pageCards: action.payload};

        default:
            return state;
    }
};
