import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findCards } from '../actions/cards.js';
import { bindActionCreators } from 'redux';

class SearchForm extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    };

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
    };

    render() {
        console.log(this.props)
        return (
        <div>
            <form className="form my-2 my-lg-0" onSubmit={(event) => { event.preventDefault()
            this.props.findCards(this.state.name, this.state.set, this.state.color, this.state.type)}}>
            <div className="row mb-2">
                <div className="col">
                <input className="form-control mr-sm-2" type="search" placeholder="Search Cards by Name" name="name" value={this.state.name} onChange={this.handleChange} aria-label="Search"/>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-4">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search by Set" name="set" value={this.state.set} onChange={this.handleChange} aria-label="Search"/>
                </div>
                <div className="col-3">
                    <select className="form-control label-select" name="color" value={this.props.color} onChange={this.handleChange}>
                        <option value="" selected>Any Color</option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Red">Red</option>
                        <option value="White">White</option>
                    </select>
                </div>
                <div className="col-3">
                    <select className="form-control label-select" name="type" value={this.props.color} onChange={this.handleChange}>
                        <option value="" selected>Any Type</option>
                        <option value="Artifact">Artifact</option>
                        <option value="Creature">Creature</option>
                        <option value="Enchantment">Enchantment</option>
                        <option value="Instant">Instant</option>
                        <option value="Planeswalker">Planeswalker</option>
                        <option value="Spell">Spell</option>
                        <option value="Sorcery">Sorcery</option>
                    </select>
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">SEARCH</button>  
                </div>
            </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      name: state.name
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({findCards}, dispatch)
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);