import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal } from '../actions/deckCards';
import Modal from 'react-modal';

class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            }
          };
        console.log('Rendering')
        
        return (
            <Modal
            isOpen={this.props.display}
            onRequestClose={()=> this.props.showModal()}
            style={customStyles}
            contentLabel="Card Details"
            >
            <h2>{this.props.name}</h2>
            <button>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
            </Modal>
        )
    }
};

const mapStateToProps = (state) => {
  return {
    display: state.deckCards.modal,
    name: state.deckCards.currentCard.name,
  }
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({showModal}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(CardModal)