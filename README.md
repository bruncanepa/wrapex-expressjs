# wrapex !

wrapex is a minimalist, async and configurable express.js wrapper with error handling 

## Install

```bash
npm install wrapex
 or
yarn add wrapex
```

## Usage 
```javascript
const {wrapex} = require('wrapex');

const myRouter = (router) => {
  router
    .get('/', (req, res, next) => {
      res.send('get myRoute')
    })
    .post('/', (req, res, next) => {
      res.send('post myRoute')
    })
};

const routes = {
  '/myRoute': myRouter
};

// routes is the only required param
const app = wrapex({routes});
/**
 * middlewares: an array of midlewares, that will be executed before endpoints
 * routePrefix: a prefix for all routes
 * routes: all the API URIs, with their Router 
 * optionsMap: execute middlewares before endpoints when the option is passed
 * onError: function that will be executed when an error ocurres
 */

app.listen(3002, () => {
  console.log(`NodeJs: Listening on port: ${3002}`);
});

// check example folder for a concrete usage example
```
