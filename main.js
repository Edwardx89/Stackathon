const secrets = require('./secrets')
const express = require('express')
const bodyParser = require('body-parser')
const apiai = require('apiai')

// using apiai token
// const app = apiai(secrets.apiAi)

// const request = app.textRequest('what is the weather in nyc', {
//   sessionId: 'Where to get this sessionId?'
// })

// request.on('response', function(response) {
//   // console.log(response);
//   console.log(response)
// })

// request.on('error', function(error) {
//   console.log(error)
// })

// request.end()


const yelp = require('yelp-fusion');
// const secrets = require('../secrets')

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = secrets.yelpClientId;
const clientSecret = secrets.yelpClientSecret;

const searchRequest = {
  categories:'japanese',
  location: '11228',
  limit: 5,
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});
