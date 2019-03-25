import {
    INCREMENT,
    DECREMENT,
    DECKCARDS,
    ADDDECKCARD,
    REMOVECARD,
    CLEARDECK
} from '../actions/deckCards'

const deckCards = (state = [], action) => {
    switch (action.type) {
        case DECREMENT:
        {
            const id = action.payload.card_id
            const qty = action.payload.qty

            const newState = state.slice(0)
            const index = newState.findIndex(card => card.id === id)

            newState[index].qty = qty

            return newState
        }

        case INCREMENT:
        {
            const id = action.payload.card_id
            const qty = action.payload.qty

            const newState = state.slice(0)
            const index = newState.findIndex(card => card.id === id)

            newState[index].qty = qty

            return newState
        }

        case CLEARDECK: 
            state = [];
            return state;

        case DECKCARDS:
            return action.payload

        case ADDDECKCARD:
            return action.payload

        case REMOVECARD:
            return [ ...state ].filter(card => card.id !== action.payload)

        default:
            return state
    }
}

export default deckCards
