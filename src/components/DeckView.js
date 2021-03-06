import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setAuthentication} from '../actions/authentication';

import SearchForm from './SearchForm';
import CardList from './CardList';
import CurveGraph from './CurveGraph';
import DeckCards from './DeckCards';
import CardModal from './CardModal';

import { decrement, increment, getDeckCards, clearDeck,} from '../actions/deckCards';

class CardView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showStats: true,
            showForm: false,
            searchMessage: ""
        }
    };

    componentDidMount = () => {
        this.props.getDeckCards(this.props.match.params.user_id, this.props.match.params.deck_id);
    };

    componentWillUnmount = () => {
        this.props.clearDeck();
    };

    toggleSearchForm = () => {
        this.setState({
            showStats: !this.state.showStats,
            showForm: !this.state.createLoc

        })
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    userLogOut = () => {
        localStorage.removeItem('token')
        this.props.setAuthentication(null)
        this.props.history.push(`/`)
    };

    returnToDecks = () => {
        this.props.history.push(`/user_id/${this.props.match.params.user_id}/decks`)
    };


    render() {
        console.log(this.props.deckCards)
        return(    
        <div className='container mb-2'>
            <div style={{marginBottom: 10, marginTop: 10}} className="row justify-content-between">
                <div className="col-6 align-items-center">
                    <h2>Deck Composition</h2>
                </div>
                <div className="col-6 align-items-center">
                    <div className="btn-group btn-group-toggle">
                        <label className="btn btn-secondary">
                            <button onClick={this.returnToDecks} className="btn text-white">Your Decks</button>
                        </label>
                        {
                            this.state.showStats ? 
                            <label className="btn btn-secondary">
                                <button style={{minWidth: 140}} onClick={this.toggleSearchForm} className="btn text-white">Find Cards</button>
                            </label>
                            :

                            <label className="btn btn-secondary">
                                <button style={{minWidth: 140}} onClick={this.toggleSearchForm} className="btn text-white">Deck Statistics</button>
                            </label>
                        }
                        <label className="btn btn-secondary">
                            <button onClick={this.userLogOut} className="btn text-white"> Logout</button>
                        </label>
                        </div>
                    </div>
                </div>
            <div className="row border border-bottom " >
                <div className='col-4 border-right'>
                        <div className="row bg-dark text-white mb-2 border-bottom justify-content-between align-items-center">
                            <div className="col-3">
                                <b>Add/Drop</b>
                            </div>
                            <div className= "col-5">
                                <b>Card/Quanity</b>
                            </div>
                            <div className="col-4">
                                <b>Mana</b>
                            </div>
                        </div>
                    { this.props.deckCards.length === 0 ?
                        <span>You Have No Cards in Your Deck...</span> 
                        :
                        <DeckCards />
                    }
                </div>
                <div className='col-8'>
                    {
                        this.state.showStats ? 
                        <CurveGraph /> 
                        :
                        <div>                     
                        <h2 className="navbar-brand"> Search Magic Cards</h2>
                        <SearchForm />
                        <CardList />
                        <CardModal />
                        </div>
                    }
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ decrement, increment, getDeckCards, setAuthentication, clearDeck}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView)
