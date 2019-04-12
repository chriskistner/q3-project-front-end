import React, {Component} from 'react';
import CardData from './CardData.js';
import { connect } from 'react-redux';

import SearchMenu from './CardSearchPageMenu';

class cardRow extends Component{
    constructor(props) {
        super(props)

        this.state = {
            allCards: this.props.cards,
            // resultL: this.props.cards.foundCards.length
        }
    }

    render () {
        console.log(this.props.cards)
        return (
            <div className="container border">
            {this.props.cards.length !== 0 ? <div className = "row align-items-center mt-1">
                <div className = "col justify-content-center">
                    <p className="text-center"><strong>{this.props.cards.length} entries found:</strong> Click Card Image for More Stats</p>
                </div>
            </div> : null}
            <div className="row align-items-center">
                <div className="col" style={{display: "flex",flexDirection: "row", flexWrap: "wrap"}}>
                {
                this.props.cards.slice(0,20).map(card => <CardData key={card.id} cardData={card} />)
                }
                </div>
                {this.props.cards.length !== 0 ? <SearchMenu foundCards = {this.props.cards.length} /> : null} 
            </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
      cards: state.cards
    }
  };

  export default connect(mapStateToProps, null)(cardRow);
