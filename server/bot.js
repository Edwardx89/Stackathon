'use strict'

module.exports = require('express').Router()
  .get('/',
    (req, res, next) =>
      res.send('hi'))

  // .post('/',
  //   (req, res, next) =>

  //     .catch(next))
  // .get('/:id',
  //   mustBeLoggedIn,
  //   (req, res, next) =>
  //     User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(next))
