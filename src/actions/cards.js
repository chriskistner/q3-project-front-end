import mtg from 'mtgsdk';
export const SEARCH_CARDS = "SEARCH_CARDS";

  export function findCards(name, set = '') {
    return async (dispatch) => {
        try {
            const response = await mtg.card.where({name, gameFormat:'standard', setName: set})
            console.log(response)
            dispatch({
                type: SEARCH_CARDS,
                payload: response
            })
        } catch (err) {
            console.error(err)
        }
    }
};
