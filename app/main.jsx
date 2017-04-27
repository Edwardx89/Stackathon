'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'
import Bot from './components/Bot'
import {getBotResponse} from './reducers/index'


const onBotEnter = () => {
  console.log('calling this')
  store.dispatch(getBotResponse({message: 'hi'}))
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={onBotEnter} component={Bot}>
        <Route path="/bot" component={Bot} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

