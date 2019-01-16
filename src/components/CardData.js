import React, { Component } from 'react';
// import './CardData.css';
import Modal from 'react-modal';

class CardData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    generateManaTags(element, id) {
        const type ={
            dark: './images/dark.png',
            light: './images/light.png',
            fire: './images/fire.png',
            life: './images/life.png',
            water: './images/water.png'
        };

        switch (element) {
            case "R":
                return (<img key={id} style={{marginLeft: 3}} src='https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/8/87/R.svg?version=3b5a5cc001a7ae6282b24606e9e99715' alt="fire" height="20" width="20" />)

            case "U":
                return <img key={id} style={{marginLeft: 3}} src='https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/9/9f/U.svg?version=99a0e26dd02040b072e33af91a6ab198' alt="water" height="20" width="20" />
                
            case "G":
                return <img key={id} style={{marginLeft: 3}} src='https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/8/88/G.svg?version=6ebca1fee33aaf3c3fc1cd39a4f782df' alt="life" height="20" width="20" />
                
            case "W":
                return <img key={id} style={{marginLeft: 3}} src='https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/8/8e/W.svg?version=6e6c411768c4bf5a947dfa973207799b' alt="light" height="20" width="20" />
                
            case "B":
                return <img key={id} style={{marginLeft: 3}} src='https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/2/2f/B.svg?version=0a87a78acd60c4f2074a0c9e4eb651a5' alt="dark" height="20" width="20" />
    
            default:
                return <span key={id} className="label label-warning"><b>{element}</b></span>
        } 
    }

    generateManaCost(cost) {
        const points = cost.replace(/[^A-Z0-9 ]/g, "");
        const displayCosts = points.split('')
        return displayCosts.map((point, id) => this.generateManaTags(point, id))
    }

    setModal = (isOpen) => {
        this.setState({ isOpen })
    }

    render() {
        const manaCost = this.props.cardData.manaCost;
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

          console.log(this.props.cardData)
        return (
            <div className="row border align-items-center">
                <div className="col"><b><a onClick={(event) =>
                    {event.preventDefault() 
                    this.setModal(true) }
                    } href="#">{this.props.cardData.name}</a></b></div>
                    <Modal isOpen={this.state.isOpen} onRequestClose={() => this.setModal(false)} style={customStyles} contentLabel="Example Modal">
                        <div className="Container">
                            <div className = "row border-bottom justify-content-end">
                                <div className="col-2">
                                    <button style={{marginBottom: 5}} className="btn btn-sm btn-light" onClick={e => this.setModal(false)}>X</button>
                                </div>
                            </div>
                            <div className = "row border-bottom">
                                <div className="col">
                                    <img style={{marginTop: 5, marginBottom: 5}} src={this.props.cardData.imageUrl} alt={this.props.cardData.name} height="400" width="250" />  
                                </div>
                            </div>
                            <div className = "row justify-content-center">
                                <div className="col-8 align-self-center">
                                    <button style={{marginTop: 5}} type="button" className="btn btn-success">Add Card to Deck</button>
                                </div>
                            </div>      
                        </div>
                    </Modal>
                <div className="col"><b>Cost: </b>{this.generateManaCost(manaCost)}</div>
                <div className="col"><button className="btn btn-sm btn-outline-primary">+</button> </div>
            </div>
        )
    }
}

export default CardData;
  