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

  // .post('/',
  //   (req, res, next) =>

  //     .catch(next))
  // .get('/:id',
  //   mustBeLoggedIn,
  //   (req, res, next) =>
  //     User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(next))
