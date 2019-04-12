import React from 'react';
import CardData from './CardData.js';
import { connect } from 'react-redux';

import SearchMenu from './CardSearchPageMenu';

function cardRow(props) {
    const cards = props.foundCards;

    return (
        <div className="container border">
        {cards.length !== 0 ? <div className = "row align-items-center mt-1">
            <div className = "col justify-content-center">
                <p className="text-center"><strong>{cards.length} entries found:</strong> Click Card Image for More Stats</p>
            </div>
        </div> : null}
        <div className="row align-items-center">
            <div className="col" style={{display: "flex",flexDirection: "row", flexWrap: "wrap"}}>
            {
            cards.slice(0,20).map(card => <CardData key={card.id} cardData={card} />)
            }
            </div>
            {cards.length !== 0 ? <SearchMenu foundCards = {cards} /> : null} 
        </div>
        </div>
    )

};

const mapStateToProps = (state) => {
    return {
      cards: state.cards
    }
  };

  export default connect(mapStateToProps, null)(cardRow);
