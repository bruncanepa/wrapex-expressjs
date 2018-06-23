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
  return wrap(this, POST, route, handlers, options);
};

WrapexRouter.prototype.put = function(route, handlers, options) {
  return wrap(this, PUT, route, handlers, options);
};

WrapexRouter.prototype.get = function(route, handlers, options) {
  return wrap(this, GET, route, handlers, options);
};

WrapexRouter.prototype.delete = function(route, handlers, options) {
  return wrap(this, DELETE, route, handlers, options);
};

WrapexRouter.prototype.use = function(route, handlers, options) {
  if (typeof route !== 'string') {
    handlers = transformToArray(route);
    this.router.use(...handlers);
    return this;
  }
  
  return wrap(this, USE, route, handlers, options);
};

function transformToArray(handlers) {
  if (!Array.isArray(handlers)) {
    handlers = [handlers];
  }
  return handlers;
}

function errorHandler({req, res, next, onError}) {
  return (error) => {
    if (onError) {
      onError({req, res, next, error});
    } else  {
      process.env.NODE_ENV !== 'production' && console.log(error);
      res.status(500).send(error.message);
    }
  };
};

function asyncRequestHandler(handler, onError) {
  return async (req, res, next) => {
    const onCatch = errorHandler({req, res, next, onError});
    try {
      await Promise.resolve(handler(req, res, next));
    } catch(err) {
      onCatch(err);
    }
  }
}

function asyncRequestHandlers(handlers = [], onError) {
  return handlers.map((handler) => asyncRequestHandler(handler, onError));
};

function getHandlers({handlers, options  = {}, optionalsMiddlewares, onError}) {
  handlers = transformToArray(handlers);

  const allHandlers = optionalsMiddlewares
    .reduce((arr, {option, handler, active}) => {
      if (active || !!options[option]) {
        arr.push(handler);
      }
      return arr;
    }, []);

  Array.prototype.push.apply(allHandlers, handlers);

  return asyncRequestHandlers(allHandlers, onError);
};

function wrap(wrapper, action, route, handlers, options) {
  const {router, optionalsMiddlewares, onError} = wrapper;
  router[action](route, ...getHandlers({handlers, options, optionalsMiddlewares, onError}));
  return wrapper;
};

module.exports = WrapexRouter;
