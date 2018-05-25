const bodyParser = require('body-parser');
const {wrapex, OptionMap} = require('../lib');

// all routes with their Router
const routes = require('./routes');

// api URI prefix
const routePrefix = '/api';

// this middlewares will be executed before all endpoints
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
const optionsMap = [
  new OptionMap('authorize', (req, res, next) => {
    if (req.body.password == 'password') {
      next();
    } else {
      res.send('Unauthorized');
    }
  }),
  new OptionMap('log', (req, res, next) => {
    console.log('Logger')
    next();
  }, true), // 'log' option will be always executed, unless {log: false} is passed
];

// returns express.js app
const app = wrapex({middlewares, routes, routePrefix, optionsMap, onError});

app.listen(3002, () => {
  console.log(`NodeJs: Listening on port: ${3002}`);
});

module.exports = app;