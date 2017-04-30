import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import secrets from '../../secrets'
import apiai from 'apiai'
const app = apiai(secrets.apiAi)


class Bot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.onSubmitClick = this.onSubmitClick.bind(this)
    this.checkRequest = this.checkRequest.bind(this)
  }

  onSubmitClick(evt) {
    evt.preventDefault()
    let msg = evt.target.text.value
    console.log('in submit')
    console.log('evt', evt.target.text.value)
    console.log('evt.val', evt.target.value)
    console.log('props', this.props) // ==> THIS RETURNING Null?
    this.checkRequest(msg)
  }

  checkRequest(msg) {
    const props = this.props
    console.log('in check request', msg)
    // const textRequest = app.textRequest(msg, {
    //   sessionId: 'Where to get this sessionId?'
    // })
    // textRequest.on('response', function (response) {
    //   console.log('this touches the text request.on in BOT COMPONENT', response)
    //   if (response.result.action === 'weather'){
    //     console.log('weather is true')
    //     const city = response.result.parameters.address.city || response.result.parameters.address['zip-code'] || response.result.parameters.address['admin-area']
    //     const restUrl = 'https://api.apixu.com/v1/current.json?key=' + secrets.weather + '&q=' + city
    //     props.getWeatherResponse({restUrl})
    //   } else {
        console.log('hitting getBotResponse in checkrequest')
        props.getBotResponse({message: msg})
      }
    // })
    // textRequest.on('error', function (error) {
    //   console.log('error on this request coming back', error)
    // })
    // textRequest.end()
  // }

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
import { getBotResponse, getWeatherResponse } from '../reducers/index'


const mapToState = (state) => ({
  state
})

export default connect(mapToState, ({ getBotResponse, getWeatherResponse }))(Bot)

