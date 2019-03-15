import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import ListofDecks from './components/ListofDecks.js';
import LoginForm from './components/LoginForm';
import AuthenticatedRoute from './higherOrderComponents/authenticatedRoute';
import DeckView from './components/DeckView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {verifyUser} from './actions/authentication';

class App extends Component {
  componentDidMount() {
    this.props.verifyUser()
  }

  render() {
    return (
      <BrowserRouter>
      <div className='container'>
          <div className="row mainContainer align-items-center justify-content-center" >
            <div className="col border bg-light">
              <Switch>
                <AuthenticatedRoute path='/user_id/:user_id/decks/:deck_id' component={DeckView} />
                <AuthenticatedRoute path='/user_id/:user_id/decks' component={ListofDecks} />
                <Route path='/' component={LoginForm}/>
              </Switch>
              </div>
          </div>
      </div>
    </BrowserRouter>
    )}
};

const mapStateToProps = ({ cards }) => ({ cards });

const mapDispatchToProps = dispatch =>
bindActionCreators({
  verifyUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
