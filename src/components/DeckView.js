import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {setAuthentication} from '../actions/authentication';

import SearchForm from './SearchForm'
import CardList from './CardList'
import CurveGraph from './CurveGraph'
import DeckCards from './DeckCards'

import { decrement, increment, getDeckCards } from '../actions/deckCards';

const server = process.env.REACT_APP_API_URL

class CardView extends Component {
    componentDidMount = () => {
        const token = localStorage.getItem('token')
        axios.get(`${server}/users/${this.props.match.params.user_id}/decks/${this.props.match.params.deck_id}/cards`,
            {
                method: "get",
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                this.props.getDeckCards(this.props.match.params.user_id, this.props.match.params.deck_id)
            })
    };

    userLogOut = () => {
        localStorage.removeItem('token')
        this.props.setAuthentication(null)
        this.props.history.push(`/`)
    };

    returnToDecks = () => {
        this.props.history.push(`/user_id/${this.props.match.params.user_id}/decks`)
    }


    render() {
        return(    
        <div className='container'>
            <div style={{marginBottom: 10, marginTop: 10}} className="row justify-content-between">
                <div className="col-6 align-items-center">
                    <h2>Deck Composition</h2>
                </div>
                <div className="col-4 align-items-center">
                    <div className="btn-group btn-group-toggle">
                        <label className="btn btn-warning">
                            <button onClick={this.returnToDecks} className="btn">Back to Decks</button>
                            </label>
                        <label className="btn btn-secondary text-white">
                            <button onClick={this.userLogOut} className="btn text-white "> Logout</button>
                            </label>
                        </div>
                    </div>
                </div>
            <div className="row" >
                <div className='col-9'>
                    <div className='row'>
                        <div className='col-5'>
                            <DeckCards />
                        </div>
                        <div className='col-7'>
                            <CurveGraph />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <h2
                        className="navbar-brand">
                        Search Magic Cards
                    </h2>
                    <SearchForm />
                    <CardList foundCards = {this.props.cards} />
                </div>
            </div>
        </div>
        )
        }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ decrement, increment, getDeckCards, setAuthentication}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView)
