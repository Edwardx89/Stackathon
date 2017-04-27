'use strict'
const secrets = require('../secrets')
const apiai = require('apiai')
const app = apiai(secrets)

module.exports = require('express').Router()
  .post('/',
  (req, res, next) => {
    const request = app.textRequest(req.body.message, {
      sessionId: 'Where to get this sessionId?'
    })
    request.on('response', function(response) {
      console.log(response)
      res.send(response.result.fulfillment.speech)
    })
    request.on('error', function(error) {
      console.log(error)
    })
    request.end()
  })

  .get('/', (req, res, next) => {
    res.sendStatus(200)
  })

  .post('/weather', (req, res, next) => {
    const request = app.textRequest(req.body.message, {
      sessionId: 'Where to get this sessionId?'
    })
    if (req.body.result.action === 'weather') {
      const city = req.body.result.parameters['geo-city']
      const restUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + 'be2e69a304cde256e50904f81357abe7' + '&q=' + city

      request.get(restUrl, (err, response, body) => {
        if (!err && response.statusCode == 200) {
          const json = JSON.parse(body)
          json.weather[0].description + ' and the temperature is ' + json.main.temp + ' ℉'
          return res.json({
            speech: msg,
            displayText: msg,
            source: 'weather'
          })
        } else {
          return res.status(400).json({
            status: {
              code: 400,
              errorType: 'I failed to look up the city name.'
            }
          })
        }
      })
    }
  })
  // .post('/',
  //   (req, res, next) =>

  //     .catch(next))
  // .get('/:id',
  //   mustBeLoggedIn,
  //   (req, res, next) =>
  //     User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(next))
