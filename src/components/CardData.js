import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Popover, {ArrowContainer} from 'react-tiny-popover'
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

    togglePopOver = () => {
        this.setState({ 
            isOpen: !this.state.isOpen 
        })
    };

    render() {
        const manaCost = this.props.cardData.manaCost || 0;
        return (
                <div class="card m-2 border border-dark" style={{width: 215}}>
                    <Popover
                        isOpen={this.state.isOpen}
                        position={'right'} // preferred position
                        padding={10}
                        disableReposition // prevents automatic readjustment of content position that keeps your popover content within your window's bounds
                        onClickOutside={() => this.togglePopOver()} // handle click events outside of the popover/target here!
                        content={({ position, targetRect, popoverRect }) => (
                            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                                position={position}
                                targetRect={targetRect}
                                popoverRect={popoverRect}
                                arrowColor={'black'}
                                arrowSize={10}
                            >
                                <div className="container rounded-right  bg-white border border-dark" style={{maxWidth: 250}}>
                                    <div className="row bg-secondary text-white border-bottom">
                                        <div className="col">
                                            <b>{this.props.cardData.name}</b>
                                        </div>
                                    </div>
                                    <div className="row border-bottom">
                                        <div className="col">
                                            <span>MANA: {this.generateManaCost(manaCost)}</span>
                                        </div>
                                    </div>
                                    <div className="row border-bottom">
                                        <div className="col">
                                            <span>POWER RATING: {this.props.cardData.power}</span>
                                        </div>
                                    </div>
                                    <div className="row border-bottom">
                                        <div className="col">
                                            <span>TYPE: {this.props.cardData.type}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <span>SET: {this.props.cardData.setName}</span>
                                        </div>
                                    </div>
                                </div>
                            </ArrowContainer>
                        )}
                    >
                    <a href="#" onClick={( event) => {
                        event.preventDefault()
                        this.togglePopOver()}}>
                    <img src={this.props.cardData.imageUrl ? this.props.cardData.imageUrl : cardDefault} alt={this.props.cardData.name} class="card-img-top"/>
                    </a>
                    <b className="text-center">{this.props.cardData.name}</b>
                    <div class="card-body border-top" style = {{padding: 0}} >
                        <a href="#" onClick={ e => this.props.addCard(this.props.auth.userId, this.props.match.params.deck_id, this.props.cardData) } class="btn btn-primary btn-block">Add to Deck</a>
                    </div>
                    </Popover>
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
