import { combineReducers } from 'redux'

/* -------------------<   ACTIONS   >--------------------- */
const ANSWER = 'ANSWER'
const WEATHER = 'WEATHER'

/* ---------------<   ACTION CREATORS   >------------------- */
export const getResponse = response => ({
  type: ANSWER, response
})

export const getWeather = response => ({
  type: WEATHER, response
})

/* -------------------<   REDUCERS   >--------------------- */
const initialState = {
  response: ''
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

export const getWeatherResponse = (message) => dispatch => {
  console.log('getting to weather dispatcher', message)
  // dispatch(getWeather(message))
}

// export const getIntent = (message) =>
const rootReducer = combineReducers({
  reducer
})

export default rootReducer
