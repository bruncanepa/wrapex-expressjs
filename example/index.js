const bodyParser = require('body-parser');
const {express, OptionMap} = require('express-wrapper');

const routes = require('./routes');

const routePrefix = '/api';

const middlewares = [
  bodyParser.urlencoded({extended: true}),
  bodyParser.json(),
  function setHeaders(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', `Content-Type, Accept`);
    next();
  }
];

const onError = ({req, res, next, error}) => {
  console.log(error);
  res.send('Ups! Error');
};

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
  }, true),
];

const app = express({middlewares, routes, routePrefix, optionsMap, onError});

app.listen(3002, () => {
  console.log(`NodeJs: Listening on port: ${3002}`);
});

module.exports = app;