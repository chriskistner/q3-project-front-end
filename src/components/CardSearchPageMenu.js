import React from 'react';
import { connect } from 'react-redux';

function searchMenu (props) {
    return (
        <div className="container">
            <div className="row align-items-center justify-content-center">
                {props.activePage > 1 ? <div classname="col-4">
                    <button type="button" onClick = {() => {props.pageDown(props.activePage, props.cardStart, props.searchResults)}} class="btn btn-light">Last</button>
                </div> : null}
                <div classname="col-4">
                    <span>..{props.activePage}..</span>
                </div>
                {props.searchResults.length >= props.cardStart + 9 ? <div classname="col-4">
                    <button type="button" onClick = {() => {props.pageUp(props.activePage, props.cardStart, props.searchResults)}} class="btn btn-light">Next</button>
                </div> : null}
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
