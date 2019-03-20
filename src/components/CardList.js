import React from 'react';
import CardData from './CardData.js';
import { connect } from 'react-redux';

function cardRow(props) {
    const cards = props.foundCards;

    return (
        <div className="container" style={{display: "flex",flexDirection: "row", flexWrap: "wrap"}}>
        {
            cards.slice(0,20).map(card => <CardData key={card.id} cardData={card} />)
            }
        </div>
    )

};

const mapStateToProps = (state) => {
    return {
      cards: state.cards
    }
  };

  export default connect(mapStateToProps, null)(cardRow);
