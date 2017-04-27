'use strict'
const secrets = require('../secrets')
const express = require('express')
const bodyParser = require('body-parser')
const apiai = require('apiai')

// using apiai token
const app = apiai(secrets)

const expressApp = express()

module.exports = expressApp
  .use(require('cookie-session')({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
  }))

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  // Serve our api to ./api
  .use('/', require('./api'))

// setting up server
const server = expressApp.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, expressApp.settings.env)
})

// Webhook
expressApp.get('/webhook', (req, res) => {
  console.log('hitting webhook')
})

const request = app.textRequest('I want to book a hotel', {
  sessionId: 'Where to get this sessionId?'
})

request.on('response', function(response) {
    // console.log(response);
  console.log(response)
})

request.on('error', function(error) {
  console.log(error)
})

request.end()
