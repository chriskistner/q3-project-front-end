import React, {Component} from 'react';
import CardData from './CardData.js';
import { connect } from 'react-redux';
import { pageUp, pageDown } from '../actions/cards';
import { bindActionCreators } from 'redux';

import SearchMenu from './CardSearchPageMenu';

class cardRow extends Component{
    constructor(props) {
        super(props)

        this.state = { }
    }

    render () {
        return (
            <div className="container border">
            {this.props.cards.length !== 0 ? <div className = "row bg-dark text-white align-items-center">
                <div className = "col-8">
                    <p className="my-1"><strong>{this.props.cards.length} Cards found:</strong> Click Card Image for More Stats</p>
                </div>
                <div className="col-4">
                    <p className="text-right my-1">Pg. {this.props.currentPage} of {this.props.totalPages} </p>
                </div>
            </div> : null}
            <div className="row align-items-center">
                <div className="col px-1" style={{display: "flex",flexDirection: "row", flexWrap: "wrap"}}>
                {
                this.props.pageCards.map(card => <CardData key={card.id} cardData={card} />)
                }
                </div>
                {this.props.cards.length !== 0 ? <SearchMenu 
                    searchResults = {this.props.cards}
                    cardStart = {this.props.cardStart} 
                    pageUp = {this.props.pageUp}
                    pageDown = {this.props.pageDown}  
                    activePage = {this.props.currentPage}
                    pageTotal = {this.props.totalPages}
                    /> 
                    : null} 
            </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
      cards: state.cards.searchCards,
      pageCards: state.cards.pageCards,
      totalPages: state.cards.totalPages,
      currentPage: state.cards.currentPage,
      cardStart: state.cards.cardStart
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({pageUp, pageDown}, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(cardRow);
