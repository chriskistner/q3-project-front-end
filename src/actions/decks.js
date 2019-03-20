import axios from 'axios';
import mtg from 'mtgsdk';
export const GET_DECKS = 'GET_DECKS';
export const CREATE_DECK = 'CREATE_DECK';
export const GET_MTG_DECKS = "GET_MTG_DECK";
const url = process.env.REACT_APP_API_URL;

export function getDecks(user_id) {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios(`${url}/users/${user_id}/decks`,
            {
                method: "get",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
            dispatch({
                type: GET_DECKS,
                payload: response.data.result
            })
        } catch (err) {
            console.err(err);
        }
    }
};

export function createDeck(deck_name, deck_wins, deck_losses, user_id) {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axios(`${url}/users/${user_id}/decks`,
            {
                method: "post",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                data: {
                    deckName: deck_name,
                    wins: deck_wins || 0,
                    losses: deck_losses || 0
                }
              });
              dispatch(getDecks(user_id))
        } catch (err) {
            console.err(err);
        }
    }
};

export function deleteDeck(id, user_id) {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axios(`${url}/users/${user_id}/decks/${id}`,
            {
                method: "delete",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
              dispatch(getDecks(user_id))
        }catch (err) {
            console.err(err)
        }
    }
};

export function addWin(id, user_id, deck_name, win_count, loss_count) {
    return async (dispatch) => {
        try {
            const newVal = win_count + 1;
            const token = localStorage.getItem('token');
            await axios(`${url}/users/${user_id}/decks/${id}`,
            {
                method: "put",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                data: {
                    deckName: deck_name,
                    wins: newVal,
                    losses: loss_count
                }
              });
              dispatch(getDecks(user_id))
        }catch(err) {
            console.log(err)
        }
    }
};

export function addLoss(id, user_id, deck_name, win_count, loss_count) {
    return async (dispatch) => {
        try {
            const newVal = loss_count + 1;
            const token = localStorage.getItem('token');
            await axios(`${url}/users/${user_id}/decks/${id}`,
            {
                method: "put",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                data: {
                    deckName: deck_name,
                    wins: win_count,
                    losses: newVal
                }
              });
              dispatch(getDecks(user_id))
        }catch(err) {
            console.log(err)
        }
    }
};

