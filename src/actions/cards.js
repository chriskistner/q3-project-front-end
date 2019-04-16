import mtg from 'mtgsdk';
export const SEARCH_CARDS = "SEARCH_CARDS";
export const GENERATE_PAGE= "GENERATE_PAGE";
export const GENERATE_PAGE_TOTAL = "GENERATE_PAGE_TOTAL";
export const PAGE_PLUS = "PAGE_PLUS";


export const generatePageTotal = (list) => {
    const totalPages = Math.ceil(list.length / 9);

    return (dispatch) => {
        dispatch({
            type: GENERATE_PAGE_TOTAL,
            payload: totalPages
        })
    }
};

export const generatePage =(list, start) => {
    const newPage = list.slice(start, start + 9);

    return (dispatch) => {
        dispatch({
            type: GENERATE_PAGE,
            payload: newPage
        })
    }
};

export const pageUp = (page, start) => {
    const newPage = {newPage: page+=1, cardStart: start+9 };
    return (dispatch) => {
        dispatch({
            type: PAGE_PLUS,
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
            dispatch(generatePageTotal(response));
            dispatch(generatePage(response, 0));

        } catch (err) {
            console.error(err)
        }
    }
};
