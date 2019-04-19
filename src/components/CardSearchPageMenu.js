import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pageUp, pageDown } from '../actions/cards';

class SearchMenu extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            <div className="container">
                <div className="row bg-dark text-white align-items-center justify-content-center">
                    {this.props.currentPage > 1 ? <div classname="col-3">
                        <a href="#" class="text-white" onClick = {() => {this.props.pageDown(this.props.currentPage, this.props.cardStart, this.props.cards)}}><strong>BACK</strong></a>
                    </div> : null}
                    <div classname="col-6">
                        <span className="px-3">Pg.{this.props.currentPage} of {this.props.totalPages}</span>
                    </div>
                    {this.props.cards.length >= this.props.cardStart + 9 ? <div classname="col-473">
                        <a href="#" class="text-white" onClick = {() => {this.props.pageUp(this.props.currentPage, this.props.cardStart, this.props.cards)}}><strong>NEXT</strong></a>
                    </div> : null}
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

  export default connect(mapStateToProps, mapDispatchToProps)(SearchMenu);
