const secrets = require('./secrets')
const express = require('express')
const bodyParser = require('body-parser')
const apiai = require('apiai')

// using apiai token
const app = apiai(secrets.apiAi)

const request = app.textRequest('what is the weather in nyc', {
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
