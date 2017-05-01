import { combineReducers } from 'redux'

/* -------------------<   ACTIONS   >--------------------- */
const ANSWER = 'ANSWER'
const WEATHER = 'WEATHER'
const YELP = 'YELP'

/* ---------------<   ACTION CREATORS   >------------------- */
export const getResponse = response => ({
  type: ANSWER, response
})

export const getWeather = response => ({
  type: WEATHER, response
})

export const getRestaurants = response => ({
  type: YELP, response
})

/* -------------------<   REDUCERS   >--------------------- */
const initialState = {
  response: '',
  type: '',
}

const reducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
  case ANSWER:
    return Object.assign({}, state, {
      response: action.response
    })
  case WEATHER:
    return Object.assign({}, state, {
      response: action.response
    })
  case YELP:
    return Object.assign({}, state, {
      response: action.response,
      type: action.type
    })
  }
  return state
}
/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios'

export const getBotResponse = (message) => dispatch => {
  console.log('bot response', message)
  axios.post('/bot', message)
  .then(res => res.data)
  .then(response => dispatch(getResponse(response)))
}

export const getYelp = (restaurants) => dispatch => {
  console.log('getting to yelp dispatcher', restaurants)
  axios.post('/bot/yelp', restaurants)
  .then(res => res.data)
  .then(restaurants => {
    console.log(restaurants)
    dispatch(getRestaurants(restaurants))
  })
}

// export const getIntent = (message) =>
const rootReducer = combineReducers({
  reducer
})

export default rootReducer
