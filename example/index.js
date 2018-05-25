const bodyParser = require('body-parser');
const {wrapex, OptionalMiddleware} = require('wrapex');

// all routes with their Router
const routes = require('./routes');

// api URI prefix
const routePrefix = '/api';

// these middlewares will be executed before all endpoints
const middlewares = [
  bodyParser.urlencoded({extended: true}),
  bodyParser.json(),
  function setHeaders(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', `Content-Type, Accept`);
    next();
  }
];

// function to be executed on errors
const onError = ({req, res, next, error}) => {
  console.log(error);
  res.send('Ups! Error');
};

// when 'authorize' or 'log' option is passed, the middleware asociated will be executed before endpoint
const optionalsMiddlewares = [
  new OptionalMiddleware('authorize', (req, res, next) => {
    if (req.body.password == 'password') {
      next();
    } else {
      res.send('Unauthorized');
    }
  }),
  new OptionalMiddleware('log', (req, res, next) => {
    console.log('Logger');
    next();
  }, true), // 'log' middleware will be always executed, unless {log: false} is passed
];

// returns express.js app ( require('express')() )
const app = wrapex({middlewares, routes, routePrefix, optionalsMiddlewares, onError});

app.listen(3002, () => {
  console.log(`NodeJs: Listening on port: ${3002}`);
});

module.exports = app;
