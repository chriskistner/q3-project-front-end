import React from 'react';
import { connect } from 'react-redux';

function searchMenu (props) {
    return (
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div classname="col-4">
                    <button type="button" class="btn btn-light">Last</button>
                </div>
                <div classname="col-4">
                    <span>..{props.activePage}..</span>
                </div>
                <div classname="col-4">
                    <button type="button" onClick = {() => {props.pageUp(props.activePage, props.cardStart)}} class="btn btn-light">Next</button>
                </div>
            </div>

        </div>
    )
};

const mapStateToProps = (state) => {
    return {
      cards: state.cards
    }
  };

  export default connect(mapStateToProps, null)(searchMenu);
