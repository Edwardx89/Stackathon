'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'
import Bot from './components/Bot'
import Bot1 from './components/Bot1'
import {getBotResponse} from './reducers/index'


// const onBotEnter = () => {
//   store.dispatch(getBotResponse({message: 'Hi'}))
// }


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Bot1}>
        <Route path="/bot" component={Bot} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

