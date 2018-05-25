const POST = 'post';
const PUT = 'put';
const GET = 'get';
const DELETE = 'delete';
const USE = 'use';

function WrapexRouter({expressRouter, optionalsMiddlewares = [], onError}) {
  const self = this;
  self.router = expressRouter;
  self.optionalsMiddlewares = optionalsMiddlewares;
  self.onError = onError;
};

WrapexRouter.prototype.post = function(route, handlers, options) {
  return getAction(this, POST, route, handlers, options);
};

WrapexRouter.prototype.put = function(route, handlers, options) {
  return getAction(this, PUT, route, handlers, options);
};

WrapexRouter.prototype.get = function(route, handlers, options) {
  return getAction(this, GET, route, handlers, options);
};

WrapexRouter.prototype.delete = function(route, handlers, options) {
  return getAction(this, DELETE, route, handlers, options);
};

WrapexRouter.prototype.use = function(route, handlers, options) {
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

function getHandlers({handlers, options  = {}, optionalsMiddlewares, onError}) {
  if (!Array.isArray(handlers)) {
    handlers = [handlers];
  }

  const allHandlers = optionalsMiddlewares
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
  const {router, optionalsMiddlewares, onError} = wrapper;
  router[action](route, ...getHandlers({handlers, options, optionalsMiddlewares, onError}));
  return wrapper;
};

module.exports = WrapexRouter;