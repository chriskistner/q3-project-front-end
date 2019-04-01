import mtg from 'mtgsdk';
export const SEARCH_CARDS = "SEARCH_CARDS";

  export function findCards(name, set = '', color= '', type= '') {
    return async (dispatch) => {
        try {
            const response = await mtg.card.where(
                {name, 
                legality: 'Legal',
                setName: set,
                types: type,
                colors: color
            })
            dispatch({
                type: SEARCH_CARDS,
                payload: response
            })
        } catch (err) {
            console.error(err)
        }
    }
};
