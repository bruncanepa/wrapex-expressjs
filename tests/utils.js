const axios = require('axios');

const SUCCESS_CODE = 200;
const ERROR_CODE = 500;
const ERROR_MESSAGE = 'ERROR_MESSAGE';
const PORT = 3000;
const API_ROUTE = `http://localhost:${PORT}/api`;

async function request(action, route, body) {
  try {
    let response;
    if (body && ['post', 'put'].indexOf(action) != -1) {
      response = await axios[action](route, body);
    } else {
      response = await axios[action](route);
    }
    return response;
  } catch (err) {
    const { data, status } = err.response;
    return { success: data.success, status };
  }
}

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

function onError({ req, res, next, error }) {
  res.status(ERROR_CODE).send({ success: false });
}

module.exports = {
  request,
  throwError,
  asyncThrowError,
  success,
  asyncSuccess,
  onError,
  SUCCESS_CODE,
  ERROR_CODE,
  ERROR_MESSAGE,
  API_ROUTE,
  PORT,
};
