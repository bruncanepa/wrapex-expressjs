const express = require('express');
const Router = require('./Router');

/**
 * middlewaresExample = [
 *   helmet,
 *   bodyParse(urleEncoded()),
 *   bodyParser.json()
 * ],
 * routePrefixExample = '/api',
 * routesExample = {
 *   '/session': (router) => router.post('/', (req, res, next) => {}).delete('/', (req, res, next) => {}),
 *   '/users': (router) => router.put('/', (req, res, next) => {}).get('/', (req, res, next) => {})
 * },
 * optionsMapExample = [new OptionMap('authorize', (req,res,next) => {}, true)],
 * onErrorExample = ({req, res, next, error}) => {},
 */

function ExpressWrapper({middlewares = [], routes, routePrefix = '', optionsMap = [], onError}) {
  const self = this;
  self.app = express();
  self.routes = routes;
  self.routePrefix = routePrefix;
  self.middlewares = middlewares;
  self.optionsMap = optionsMap;
  self.onError = onError;
  this.useMiddlewares();
  this.useEndpoints();
};

ExpressWrapper.prototype.useEndpoints = function() {
  const {routes, app, onError, routePrefix, optionsMap} = this;
  Object
    .keys(routes)
    .forEach(function(route) {
      const expressRouter = express.Router();
      const wrapper = new Router({expressRouter, optionsMap, onError});
      app.use(`${routePrefix}${route}`, routes[route](wrapper).router);
    });
};

ExpressWrapper.prototype.useMiddlewares = function() {
  const {app} = this;
  this.middlewares
    .forEach(function(middleware) {
      app.use(middleware);
    })
};

module.exports = function({middlewares = [], routes, routePrefix, optionsMap = [], onError}) {
  const expressWrapper = new ExpressWrapper({middlewares, routePrefix, routes, optionsMap, onError});
  return expressWrapper.app;
};
