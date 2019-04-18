import {
    INCREMENT,
    DECREMENT,
    DECKCARDS,
    ADDDECKCARD,
    REMOVECARD,
    CLEARDECK,
    FETCHCARD
} from '../actions/deckCards';

const initialState = {
    deck: [],
    currentCard: {}
};

const deckCards = (state = initialState, action) => {
    switch (action.type) {
        case DECREMENT:
        {
            const id = action.payload.card_id;
            const qty = action.payload.qty;

            const newState = state.deck.slice(0);
            const index = newState.findIndex(card => card.id === id);

            newState[index].qty = qty;

            return {...state, deck: newState};
        }

        case INCREMENT:
        {
            const id = action.payload.card_id;
            const qty = action.payload.qty;

            const newState = state.deck.slice(0);
            const index = newState.findIndex(card => card.id === id);

            newState[index].qty = qty;

            return {...state, deck: newState};

        }

        case CLEARDECK: 
            return {...state, deck: [], currentCard: {} };

        case FETCHCARD:
            const viewCard = action.payload;
            return {...state, currentCard: viewCard};

        case DECKCARDS:
            const deckCards = action.payload;
            return {...state, deck: deckCards};

        case ADDDECKCARD:
            const updatedDeck = action.payload;
            return {...state, deck: updatedDeck};

        case REMOVECARD:
            const cardId = action.payload;
            return {...state, deck: state.deck.filter(card => card.id !== cardId)}
        default:
            return state
    }
}

export default deckCards
