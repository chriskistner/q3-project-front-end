import axios from 'axios';
import mtg from 'mtgsdk';

import { convertCost, convertTypes } from '../utilities/utilities';

export const DECREMENT = 'DECREMENT';
export const INCREMENT = "INCREMENT";
export const DECKCARDS = 'DECKCARDS';
export const ADDDECKCARD = 'ADDDECKCARD';
export const REMOVECARD = 'REMOVECARD';
export const CLEARDECK = 'CLEARDECK';
export const FETCHCARD = "FETCHCARD";

const server = process.env.REACT_APP_API_URL

export const getDeckCards = (userId, deckId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(
                server +
                '/users/' + userId +
                '/decks/' + deckId +
                '/cards',
                {
                    method: "get",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

            dispatch({ type: DECKCARDS, payload: response.data })

        } catch (err) {
            console.error(err)
        }
    }
}

export const decrement = (userId, deckId, cardId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios(
                server +
                '/users/' + userId +
                '/decks/' + deckId +
                '/cards/' + cardId +
                '/remove',
                {
                    method: "patch",
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                })
            dispatch({ type: DECREMENT, payload: response.data })

        } catch (err) {
            console.error(err)
        }
    }
};


export const increment = (userId, deckId, cardId) => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios(
                server +
                '/users/' + userId +
                '/decks/' + deckId +
                '/cards/' + cardId +
                '/add',
                {
                    method: "patch",
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                })
            dispatch({ type: INCREMENT, payload: response.data })

        }catch(err) {
            console.log(err)
        }
    }
}

export const addCard = (userId, deckId, cardData) => {
    return async (dispatch) => {
        const body = convertCost(cardData.manaCost)
        body.types = convertTypes(cardData.types, cardData.subtypes)
        body.name = cardData.name
        body.api_id= cardData.multiverseid
        try {
            const token = localStorage.getItem('token')
            await axios(
                server +
                '/users/' + userId +
                '/decks/' + deckId +
                '/cards/add',
                {
                    method: "post",
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                      },
                      data: body
                })

            const getResponse = await axios.get(
                server +
                '/users/' + userId +
                '/decks/' + deckId +
                '/cards',
                {
                    method: "get",
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                })

            dispatch({ type: ADDDECKCARD, payload: getResponse.data })

        } catch (err) {
            console.log(err)
        }
    }
};

export const remove = (userId, deckId, cardId) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const deletedCard = await axios(
                server +
                '/users/' + userId +
                '/decks/' + deckId +
                '/cards/' + cardId +
                '/remove',
                {
                    method: "delete",
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  })

        dispatch({ type: REMOVECARD, payload: deletedCard.data.card_id })
    } catch (err) {
        console.log(err)
    }
    }
};

export const clearDeck = () => {
    return (dispatch) => {
        dispatch({type: CLEARDECK})
    }
};

export const fetchCard = (id) => {
    return async (dispatch) => {
        try {
            const response= await mtg.card.find(id)
            dispatch({
                type: FETCHCARD,
                payload: response
            })
        }catch(err) {
            console.log(err)
        }
    };
};
