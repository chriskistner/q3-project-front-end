import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QtyButtons from './QtyButtons';
import { decrement } from '../actions/deckCards';
import mountain from '../icons/MTG_Mountain.png';
import ocean from '../icons/MTG_Blue.png';
import plains from '../icons/MTG_Plains.png';
import forest from '../icons/MTG_Forest.png';
import swamp from '../icons/MTG_Swamp.png';

class DeckCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    translateCost = () => {
        const types = [
            'red',
            'blue',
            'black',
            'green',
            'white',
            'colorless'
        ]

        return types.reduce((acc, type) => {
            if (this.props[type] !== 0) {
                acc[type] = this.props[type]
            }
            return acc
        }, {})
    };

    getCost = () => {
        const cost = this.translateCost()
        const images = []
        const imageURLs = {
            red: mountain,
            blue: ocean,
            green: forest,
            white: plains,
            black: swamp
        };

        if (cost.colorless) {
            images.push( <span key={ 'colorless' } className=' colorless-cost'> {  cost.colorless } </span> )
        }

        for (let type in cost) {
            for (let i = 0; i < cost[type]; i++) {
                if (type !== 'colorless')
                images.push(
                    <img key={ i + type }
                    src={ imageURLs[type] }
                    height='15'
                    width='15'
                    alt={ type }
                    className='color-cost'
                    />
                )
            }
        }

        return images

    }



    render = () => {
        return (
            <div className="row py-1 border-bottom justify-content-between align-items-center">
                <div className="col-3">
                    <QtyButtons
                    qty={ this.props.qty }
                    id = { this.props.id }
                    />
                </div>
                <div className="col-5">
                { this.props.qty }x {this.props.name }
                </div>
                <div className="col-4">
                    <span className='card-cost'>{ this.getCost() }</span>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ decrement }, dispatch)

export default connect(null, mapDispatchToProps)(DeckCard)
