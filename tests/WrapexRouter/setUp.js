const axios = require('axios');
const express = require('express');
const WrapexRouter = require('../../lib/WrapexRouter');

const SUCCESS_CODE = 200;
const ERROR_CODE = 500;
const ERROR_MESSAGE = 'ERROR_MESSAGE';
const PORT = 3000;
const API_ROUTE = `http://localhost:${PORT}/api`

function throwError(req, res) {
  throw new Error(ERROR_MESSAGE);
}

async function asyncThrowError(req, res) {
  throwError(req, res);
}

function success(req, res) {
  res.status(SUCCESS_CODE).send(req.use);
}

async function asyncSuccess(req, res) {
  res.status(SUCCESS_CODE).send(req.asyncUse);
}

function onError({req, res, next, error}) {
  res.status(ERROR_CODE).send({success: false});
}

function runServer() {
  return new Promise((resolve) => {
    const expressRouter = express.Router();
    const wrapper = new WrapexRouter({expressRouter, onError});
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
      
    const server =  app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      resolve(server);
    });
  })
}

async function request(action, route) {
  try {
    const response = await axios[action](route);
    return response;
  } catch (err) {
    const { data, status } = err.response;
    return { success: data.success, status };
  }
}

module.exports = {
  throwError,
  asyncThrowError,
  success,
  asyncSuccess,
  runServer,
  request,
  ERROR_CODE,
  SUCCESS_CODE,
  API_ROUTE
};