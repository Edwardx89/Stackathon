'use strict'
const secrets = require('../secrets')
const apiai = require('apiai')
const app = apiai(secrets.apiAi)
const request = require('request')
const yelp =require('yelp-fusion')

const clientId = secrets.yelpClientId;
const clientSecret = secrets.yelpClientSecret;

module.exports = require('express').Router()
  .post('/weather', (req, res, next) => {
    if (req.body.result.action === 'weather') {
      console.log('check parameters', req.body.result.parameters.address)
      const city = req.body.result.parameters.address.city || req.body.result.parameters.address['zip-code'] || req.body.result.parameters.address['admin-area']
      const restUrl = 'https://api.apixu.com/v1/current.json?key=' + secrets.weather + '&q=' + city

      request.get(restUrl, (err, response, body) => {
        console.log('response for weather', response)
        if (!err && response.statusCode == 200) {
          const json = JSON.parse(body)
          console.log('JSON', json)
          let msg = json.location.name + ': '+json.current.condition.text + ' and the temperature is ' + json.current.temp_f + ' ℉'
          return res.json({
            speech: msg,
            displayText: msg,
            source: 'weather'
          })
        } else {
          return res.status(400).json({
            speech: "Sorry, We can't find what you are looking for.",
            status: {
              code: 400,
              errorType: 'I failed to look up the city name.'
            }
          })
        }
      })
    }
  })

.post('/yelp',
  (req, res, next) => {
    console.log('in the yelp post / ', req.body)
    const searchRequest = {
          categories: req.body.categories,
          location: req.body.location,
          limit: 5,
        }
        yelp.accessToken(clientId, clientSecret)
        .then(response => {
          const client = yelp.client(response.jsonBody.access_token);
          client.search(searchRequest).then(response => {
            const firstResult = response.jsonBody.businesses;
            const prettyJson = JSON.stringify(firstResult, null, 4);
            res.send(prettyJson);
            console.log(prettyJson)
        });
      }).catch(e => {
        console.log(e);
      });
  })

  .get('/', (req, res, next) => {
    res.sendStatus(200)
  })

  .post('/',
  (req, res, next) => {
    console.log('in the post / ')
    const textRequest = app.textRequest(req.body.message, {
      sessionId: 'Where to get this sessionId?'
    })
    textRequest.on('response', function (response) {
      console.log('checking condition', response.result.actionIncomplete === false)

      res.send(response.result.fulfillment.speech || 'Sorry I do not understand.')
    })

    textRequest.on('error', function (error) {
      res.send(('Sorry, I am having trouble with your request.'))
      console.log('error on this request coming back', error)
    })
    textRequest.end()
  })

  .get('/', (req, res, next) => {
    res.sendStatus(200)
  })


  /* For Facebook Validation */
  .get('/facebook', (req, res) => {
    console.log('this is get request with facebook', req.query['hub.verify_token'] === secrets.facebook)
    if (req.query['hub.mode'] && req.query['hub.verify_token'] === secrets.facebook) {
      res.status(200).send(req.query['hub.challenge']);
    } else {
      res.status(403).end();
    }
  })

  /* Handling all messenges */
  .post('/facebook', (req, res) => {
    console.log(req.body.entry[0].messaging);
    console.log('hitting facebook', req.body)
    if (req.body.object === 'page') {
      req.body.entry.forEach((entry) => {
        entry.messaging.forEach((event) => {
          if (event.message && event.message.text) {
            sendMessage(event);
          }
        });
      });
      res.status(200).end();
    }
  })

function sendMessage(event) {
  console.log('send message func hit',event)
  let sender = event.sender.id;
  let text = event.message.text;

  const textRequest = app.textRequest(text, {
    sessionId: 'Where to get this sessionId?'
  })

  textRequest.on('response', (response) => {
    console.log('sending response from server', response)

    if (response.result.action === 'restaurant.search' && response.result.actionIncomplete === false){
      console.log('restaurant is true')
        const searchRequest = {
          categories: response.result.parameters.cuisine,
          location: response.result.parameters['zip-code'],
          limit: 5
        }
        console.log(searchRequest)

        yelp.accessToken(clientId, clientSecret)
        .then(response => {
          const client = yelp.client(response.jsonBody.access_token);
          client.search(searchRequest)
          .then(response => {
            const firstResult = response.jsonBody.businesses;
            const prettyJson = JSON.stringify(firstResult, null, 4);
            console.log('prettyJSON', prettyJson)
            response.jsonBody.businesses.forEach((restaurant,idx) => {
            console.log('hitting restaurants in forEach', restaurant)
            let business = restaurant.name+ ': ' +" \n"+ restaurant.location.address1 + ', '+ restaurant.location.city + ', '+ restaurant.location.state+'.' + restaurant.location.zip_code + '\n'
            + "Phone Number: " + restaurant.display_phone + '\n'
            + "Rating: " + restaurant.rating
            request({
              url: 'https://graph.facebook.com/v2.6/me/messages',
              qs: {access_token: secrets.facebook},
              method: 'POST',
              json: {
                recipient: { id: sender },
                message: { text: business }
              }
            })
          })
        })
        }).catch(e => {
        console.log(e);
      });

    } else {
      let aiText = response.result.fulfillment.speech;
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: secrets.facebook},
        method: 'POST',
        json: {
          recipient: { id: sender },
          message: { text: aiText }
        }
      }, (error, response) => {
        if (error) {
          console.log('Error sending message: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      });
    }
  });

  textRequest.on('error', (error) => {
    console.log(error);
  });

  textRequest.end();
}
