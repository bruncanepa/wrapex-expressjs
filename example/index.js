const bodyParser = require("body-parser");
const { wrapex, OptionalMiddleware } = require("wrapex");

// all routes with their Router
const routes = require("./routes");

// api URI prefix
const routePrefix = "/api";

// these middlewares will be executed before all endpoints
const middlewares = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  function setHeaders(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  }
];

// function to be executed on errors
const onError = ({ req, res, next, error }) => {
  console.log(error);
  res.status(500).send({ success: false });
};

// when 'authorize' or 'log' option is passed, the middleware asociated will be executed before endpoint
const optionalsMiddlewares = [
  new OptionalMiddleware("authorize", (req, res, next) => {
    if (req.body.password == "password") {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  }),
  new OptionalMiddleware(
    "log",
    (req, res, next) => {
      console.log("Logger");
      next();
    },
    true
  ) // 'log' middleware will be always executed, unless {log: false} is passed
];

// returns express.js app ( require('express')() )
const app = wrapex({
  middlewares,
  routes,
  routePrefix,
  optionalsMiddlewares,
  onError
});

module.exports = (port = 3002) => {
  return new Promise(resolve => {
    const server = app.listen(port, () => {
      console.log(`NodeJs: Listening on port: ${port}`);
      resolve(server);
    });
  });
};
