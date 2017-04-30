import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import secrets from '../../secrets'
import apiai from 'apiai'
const app = apiai(secrets.apiAi)
import yelp from 'yelp-fusion'
import { Card, CardTitle } from 'react-materialize'

const clientId = secrets.yelpClientId;
const clientSecret = secrets.yelpClientSecret;


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
    this.checkRequest(msg)
    evt.target.text.value = ''
  }

  checkRequest(msg) {
    const props = this.props
    console.log('in check request', msg)
    const textRequest = app.textRequest(msg, {
      sessionId: 'Where to get this sessionId?'
    })
    textRequest.on('response', function (response) {
      console.log('this touches the text request.on in BOT COMPONENT', response)
      console.log(response)
      if (response.result.action === 'restaurant.search' && response.result.actionIncomplete === false){
        console.log('restaurant is true')
        const searchRequest = {
          categories: response.result.parameters.cuisine,
          location: response.result.parameters['zip-code']
        }
        props.getYelp(searchRequest)
      } else {
        console.log('hitting getBotResponse in checkrequest')
        props.getBotResponse({message: msg})
      }
    })
    textRequest.on('error', function (error) {
      console.log('error on this request coming back', error)
    })
    textRequest.end()
  }

  render() {
    console.log('render props, this.props', this.props)
    const type = this.props.state.reducer.type
    const response = this.props.state.reducer.response
    console.log(response)
    return (
      <div>
        {/*<div className="bot_image">
          <img src="https://futureoflife.org/wp-content/uploads/2015/11/artificial_intelligence_benefits_risk.jpg" />
        </div>*/}
        <div className="container">
          <form onSubmit={this.onSubmitClick}>
            <input id="speech" type="text" name="text" />
            <button id="rec" className="btn" type="submit">Speak</button>
            <div id="spokenResponse" className="spoken-response">
          {type === 'YELP' && (typeof response)==='object' ? ( response.map((restaurant) => {
            return (<div className="spoken-response__text">
                     <div class="row">
        <div class="col s12 m7">
          <div class="card">
          <h2>Restaurant Name: {restaurant.name} </h2>
            <div class="card-image">
              <img src={restaurant.image_url} className="img-thumbnail"/>
            </div>
            <div class="card-content">
              <ul>
                    <li>Address : {restaurant.location.address1}, {restaurant.location.city}, {restaurant.location.state} </li>
                    <li>Phone Number : {restaurant.display_phone} </li>
                    <li>Rating : {restaurant.rating} </li>
                    </ul>
            </div>
            <div class="card-action">
              <a href={restaurant.url} >More info</a>
            </div>
          </div>
        </div>
      </div>
                    </div>
            )
                  })) : <div className="spoken-response__text">{response}</div>}
          </div>
          </form>
        </div>
        <div className="owner">
          <div className="owner_btn btn">
            Edward Goo - A.I. BOT
    </div>
        </div>
      </div>
    )
  }
}

/* -------------------<   CONTAINER   >-------------------- */

import { connect } from 'react-redux'
import { getBotResponse, getYelp } from '../reducers/index'


const mapToState = (state) => ({
  state
})

export default connect(mapToState, ({ getBotResponse, getYelp }))(Bot)

// <h4>Restaurant Name: {restaurant.name} </h4>
//                       <img src={restaurant.image_url} className="img-thumbnail"/>
//                     <ul>
//                     <li>Address : {restaurant.location.address1}, {restaurant.location.city}, {restaurant.location.state} </li>
//                     <li>Phone Number : {restaurant.display_phone} </li>
//                     <li>Rating : {restaurant.rating} </li>
//                     <li>More Info : {restaurant.url} </li>
//                     </ul>
