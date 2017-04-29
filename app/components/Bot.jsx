import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class Bot extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmitClick.bind(this)
  }

  onSubmitClick(evt) {
    console.log('in submit', this.props)
    evt.preventDefault();
    console.log('evt', evt.target)
    console.log('evt.val', evt.target.value)
    this.props.getResponse(evt.target.value)
  }
  render() {
    console.log(this.props)
    return (
      <div className="image">
        <div className="bot_image">
          <img src="https://futureoflife.org/wp-content/uploads/2015/11/artificial_intelligence_benefits_risk.jpg" />
        </div>
        <div className="container">
          <form>
            <input id="speech" type="text" name="text" />
            <button id="rec" className="btn">Speak</button>
            <div id="spokenResponse" className="spoken-response">
              <div className="spoken-response__text">PUT RESPONSE HERE</div>
            </div>
          </form>
        </div>
        <div className="debug">
          <div className="debug__btn btn">
            Debug JSON results
    </div>
          <div className="debug__content">
            <textarea id="response" cols="40" rows="20"></textarea>
          </div>
        </div>
      </div>
    )
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux'
// import rootReducer from '../reducers/index'


const mapToState = (state) => {
  state
}

// const mapStateToProps = (dispatch) => {
//   return {
//     getResponse: (msg) => {
//       dispatch(getBotResponse(msg))
//     }
//   }
// }
export default connect(mapToState)(Bot)

