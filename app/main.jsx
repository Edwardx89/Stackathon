'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Bot from './components/Bot'

const ExampleApp = connect(
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={Bot}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Bot} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
