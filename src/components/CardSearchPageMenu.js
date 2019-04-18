import React from 'react';
import { connect } from 'react-redux';

function searchMenu (props) {
    return (
        <div className="container">
            <div className="row bg-dark text-white align-items-center justify-content-center">
                {props.activePage > 1 ? <div classname="col-3">
                    <a href="#" class="text-white" onClick = {() => {props.pageDown(props.activePage, props.cardStart, props.searchResults)}}><strong>BACK</strong></a>
                </div> : null}
                <div classname="col-6">
                    <span className="px-3">Pg.{props.activePage} of {props.pageTotal}</span>
                </div>
                {props.searchResults.length >= props.cardStart + 9 ? <div classname="col-473">
                    <a href="#" class="text-white" onClick = {() => {props.pageUp(props.activePage, props.cardStart, props.searchResults)}}><strong>NEXT</strong></a>
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
