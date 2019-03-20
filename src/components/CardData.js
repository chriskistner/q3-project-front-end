import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import mountain from '../icons/MTG_Mountain.png';
import ocean from '../icons/MTG_Blue.png';
import plains from '../icons/MTG_Plains.png';
import forest from '../icons/MTG_Forest.png';
import swamp from '../icons/MTG_Swamp.png';
import cardDefault from '../icons/MTG_CardBack.jpg';

import { addCard } from '../actions/deckCards'

class CardData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    generateManaTags(element, id) {
        switch (element) {
            case "R":
                return (<img key={id} style={{marginLeft: 3}} src= {mountain} alt="Moutain" height="20" width="20" />)

            case "U":
                return <img key={id} style={{marginLeft: 3}} src= {ocean} alt="Ocean" height="20" width="20" />

            case "G":
                return <img key={id} style={{marginLeft: 3}} src= {forest} alt="Forest" height="20" width="20" />

            case "W":
                return <img key={id} style={{marginLeft: 3}} src= {plains} alt="Plains" height="20" width="20" />

            case "B":
                return <img key={id} style={{marginLeft: 3}} src= {swamp} alt="Swamp" height="20" width="20" />

            default:
                return <span key={id} className="label label-warning"><b>{element}</b></span>
        }
    }

    generateManaCost(cost) {
        if(cost === 0) return "0";
        const points = cost.replace(/[^A-Z0-9 ]/g, "");
        const displayCosts = points.split('')
        return displayCosts.map((point, id) => this.generateManaTags(point, id));
    };

    setModal = (isOpen) => {
        this.setState({ isOpen })
    };

    render() {
        const manaCost = this.props.cardData.manaCost || 0;
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-25%',
              transform             : 'translate(-50%, -50%)',
              backgroundColor       :  "gray",
              border                : "2px black solid"
            }
          };
        return (
            <div className="row border align-items-center justify-content-around">
                {/* eslint-disable-next-line */}
                <span className="col-4"><b><a onClick={(event) =>
                    {event.preventDefault()
                    this.setModal(true) }
                    } href="#">{this.props.cardData.name}</a></b>
                </span>
                <Modal isOpen={this.state.isOpen} onRequestClose={() => this.setModal(false)} style={customStyles} contentLabel="Example Modal">
                    <div className="Container">
                        <div className = "row border-bottom justify-content-end">
                            <div className="col-2">
                                <button style={{marginBottom: 5}} className="btn btn-sm btn-light" onClick={e => this.setModal(false)}>X</button>
                            </div>
                        </div>
                        <div className = "row border-bottom">
                            <div className="col">
                                <img style={{marginTop: 5, marginBottom: 5}} src={this.props.cardData.imageUrl ? this.props.cardData.imageUrl : cardDefault} alt={this.props.cardData.name} height="400" width="250" />
                                {
                                    !this.props.cardData.imageUrl ? 
                                                                <div className = "row mb-0">
                                                                    <div className="col">
                                                                        <p className="text-center text-white mb-0"><i>Card Image Unavailable</i></p>
                                                                    </div>
                                                                </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className = "row border-bottom">
                            <div className="col">
                                <h4 className="text-center text-white">{this.props.cardData.name}</h4>
                            </div>
                        </div>
                        <div className = "row justify-content-center">
                            <div className="col-8 align-self-center">
                                <button style={{marginTop: 5}} type="button" className="btn btn-success">Add Card to Deck</button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <span>{this.generateManaCost(manaCost)}</span>
                <button className="btn btn-sm btn-outline-primary" onClick={ e => this.props.addCard(this.props.auth.userId, this.props.match.params.deck_id, this.props.cardData) }>+</button>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ addCard }, dispatch)

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardData));
