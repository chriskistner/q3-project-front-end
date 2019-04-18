import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decrement } from '../actions/deckCards'
import DeckCard from './DeckCard'

const DeckCards = (props) => {
    return     (
        <div>
            {
                props.deckCards.deck.map(card => <DeckCard key= { card.id } { ...card } />)
            }
        </div>
    )
}

const mapStateToProps = ({ deckCards }) => ({ deckCards })
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ decrement }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckCards)
