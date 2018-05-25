const POST = 'post';
const PUT = 'put';
const GET = 'get';
const DELETE = 'delete';
const USE = 'use';

function Router({expressRouter, optionsMap = [], onError}) {
  const self = this;
  self.router = expressRouter;
  self.optionsMap = optionsMap;
  self.onError = onError;
};

Router.prototype.post = function(route, handlers, options) {
  return getAction(this, POST, route, handlers, options);
};

Router.prototype.put = function(route, handlers, options) {
  return getAction(this, PUT, route, handlers, options);
};

Router.prototype.get = function(route, handlers, options) {
  return getAction(this, GET, route, handlers, options);
};

Router.prototype.delete = function(route, handlers, options) {
  return getAction(this, DELETE, route, handlers, options);
};

Router.prototype.use = function(route, handlers, options) {
  return getAction(this, USE, route, handlers, options);
};

function errorHandler({req, res, next, onError}) {
  return function(error) {
    if (onError) {
      onError({req, res, next, error});
    } else  {
      process.env.NODE_ENV != 'production' && console.log(error);
      res.sendStatus(500).send(error);
    }
  };
};

function asyncRequestHandler(handlers = [], onError) {
  return handlers
    .map(handler => (req, res, next) => {
      const onCatch = errorHandler({req, res, next, onError});
      try {
        Promise.resolve(handler(req, res, next));
      } catch(err) {
        onCatch(err);
      }
    });
};

function getHandlers({handlers, options  = {}, optionsMap, onError}) {
  if (!Array.isArray(handlers)) {
    handlers = [handlers];
  }

  const allHandlers = optionsMap
    .reduce(function(arr, {option, handler, active}) {
      if (active || !!options[option]) {
        arr.push(handler);
      }
      return arr;
    }, []);

  Array.prototype.push.apply(allHandlers, handlers);

  return asyncRequestHandler(allHandlers, onError);
};

function getAction(wrapper, action, route, handlers, options) {
  const {router, optionsMap, onError} = wrapper;
  router[action](route, ...getHandlers({handlers, options, optionsMap, onError}));
  return wrapper;
};

module.exports = Router;