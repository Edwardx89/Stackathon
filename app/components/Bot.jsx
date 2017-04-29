import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class Bot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.onSubmitClick = this.onSubmitClick.bind(this)
  }

  onSubmitClick(evt) {
    evt.preventDefault()
    let msg = evt.target.text.value
    console.log('in submit')
    console.log('evt', evt.target.text.value)
    console.log('evt.val', evt.target.value)
    console.log('props', this.props) // ==> THIS RETURNING Null?
    this.props.getBotResponse({message: msg})
  }
  render() {
    console.log('render props, this.props', this.props)
    return (
      <div className="image">
        <div className="bot_image">
          <img src="https://futureoflife.org/wp-content/uploads/2015/11/artificial_intelligence_benefits_risk.jpg" />
        </div>
        <div className="container">
          <form onSubmit={this.onSubmitClick}>
            <input id="speech" type="text" name="text" />
            <button id="rec" className="btn" type="submit">Speak</button>
            <div id="spokenResponse" className="spoken-response">
              <div className="spoken-response__text">{this.props.state.reducer.response}</div>
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
import { getBotResponse } from '../reducers/index'


const mapToState = (state) => ({
  state
})

export default connect(mapToState, ({ getBotResponse }))(Bot)

