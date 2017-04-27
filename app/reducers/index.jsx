import { combineReducers } from 'redux'

/* -------------------<   ACTIONS   >--------------------- */
const ANSWER = 'ANSWER'

/* ---------------<   ACTION CREATORS   >------------------- */
export const getResponse = response => ({
  type: ANSWER, response
})

/* -------------------<   REDUCERS   >--------------------- */
const initialState = {
  response: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case ANSWER:
    return Object.assign({}, state, {
      response: action.response
    })
  }
  return state
}
/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios'

export const getBotResponse = (message) => dispatch => {
  axios.post('/bot', message)
  .then(res => res.data)
  .then(response => dispatch(getResponse(response)))
}

const rootReducer = combineReducers({
  reducer
})

export default rootReducer
