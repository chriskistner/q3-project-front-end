import React from 'react'
import {withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decrement, increment } from '../actions/deckCards'

const QtyButtons = (props) => {
    console.log("poops", props.qty)

    return(
        <span className='qtyButtons'>
            <button onClick = { () => {
                    if ( props.qty > 1 )  { // pick a a function
                        props.decrement(
                            props.match.params.user_id,
                            props.match.params.deck_id,
                            props.id
                        )

                    } else {
                        props.remove(
                            props.match.params.user_id,
                            props.match.params.deck_id,
                            props.id
                        )
                    }
                }
                 }>-</button>
            <button onClick={ () => props.increment(props.match.params.user_id, props.match.params.deck_id, props.id)}>+</button>
        </span>
    )
}
// const mapStateToProps = ({ cards }) => ({ cards })
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ decrement, increment }, dispatch)

export default withRouter(connect(null, mapDispatchToProps)(QtyButtons))
