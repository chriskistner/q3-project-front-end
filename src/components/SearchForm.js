import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findCards } from '../actions/cards.js';
import { bindActionCreators } from 'redux';
import SetOptions from './SetLists';

class SearchForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            set: '',
            color: '',
        }
    };

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
    };

    handleChangeName = (event) => {
        this.setState({
          name: event.target.value
        })
      };

    handleChangeSet = (event) => {
        this.setState({
            set: event.target.value
        })
    };

    render() {
        return (
        <div>
            <form className="form my-2 my-lg-0" onSubmit={(event) => { event.preventDefault()
            this.props.findCards(this.state.name, this.state.set)}}>
            <div className="row mb-2">
                <div className="col">
                <input className="form-control mr-sm-2" type="search" placeholder="Search Cards by Name" name="name" value={this.state.name} onChange={this.handleChange} aria-label="Search"/>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-6">
                    <select className="form-control label-select" name="color" value={this.props.color} onChange={this.handleChange}>
                        <option value="default" selected disabled>Select Card Color if Known</option>
                        <option value="black">Black</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                    </select>
                </div>
                <div className="col-6">
                    <select className="form-control label-select" name="type" value={this.props.color} onChange={this.handleChange}>
                        <option value="default" selected disabled>Select Card Type if Known</option>
                        <option value="artifact">Artifact</option>
                        <option value="creature">Creature</option>
                        <option value="enchantment">Enchantment</option>
                        <option value="Instant">Instant</option>
                        <option value="planeswalker">Planeswalker</option>
                        <option value="spell">Spell</option>
                        <option value="sorcery">Sorcery</option>
                    </select>
                </div>
            </div>

                <SetOptions name="set" set={this.state.set} changeSet={this.handleChange} />
                <button className="btn btn-block btn-outline-success my-2 my-sm-0" type="submit">Find Card By Name</button>  
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