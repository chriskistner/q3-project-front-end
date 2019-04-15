import mtg from 'mtgsdk';
export const SEARCH_CARDS = "SEARCH_CARDS";
export const GENERATE_PAGE= "GENERATE_PAGE";


export const generatePage =(list, page) => {
    const newPage = list.slice(0 * page, page * 9);

    return (dispatch) => {
        dispatch({
            type: GENERATE_PAGE,
            payload: newPage
        })
    }
}

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
            });

            dispatch(generatePage(response, 1));

        } catch (err) {
            console.error(err)
        }
    }
};
