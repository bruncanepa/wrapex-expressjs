const express = require('express');

const WrapexRouter = require('../../lib/WrapexRouter');
const {
  asyncSuccess,
  asyncThrowError,
  onError,
  success,
  throwError,
} = require('../utils');

function runServer() {
  return new Promise(resolve => {
    const expressRouter = express.Router();
    const wrapper = new WrapexRouter({ expressRouter, onError });
    const app = express().use('/api', wrapper.router);

    wrapper
      .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        req.use = true;
        next();
      })
      .get('/', success)
      .get('/error', throwError)
      .post('/', success)
      .post('/error', throwError)
      .put('/', success)
      .put('/error', throwError)
      .delete('/', success)
      .delete('/error', throwError)
      .use('/use', success)
      .use('/useError', throwError)
      .use(async (req, res, next) => {
        req.asyncUse = true;
        next();
      })
      .get('/async', asyncSuccess)
      .get('/async/error', asyncThrowError)
      .post('/async', asyncSuccess)
      .post('/async/error', asyncThrowError)
      .put('/async', asyncSuccess)
      .put('/async/error', asyncThrowError)
      .delete('/async', asyncSuccess)
      .delete('/async/error', asyncThrowError)
      .use('/async/use', asyncSuccess)
      .use('/async/useError', asyncThrowError);

    const server = app.listen(3000, () => {
      console.log(`Listening on ${3000}`);
      resolve(server);
    });
  });
}

module.exports = runServer;
