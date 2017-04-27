'use strict'

const api = module.exports = require('express').Router()

api
  .use('/bot', require('./bot'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
