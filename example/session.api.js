
const get = (req, res) => {
  res.send('session get');
};

const post = (req, res) => {
  res.send('session post',);
};

const deleteH = (req, res) => {
  res.send('session delete');
};

const put = (req, res) => {
  res.send('session put');
};

const use = (req, res) => {
  res.send('session use');
};

module.exports = (router) => (
  router
    .use('/use', use)
    .get('/', get)
    .post('/', post, {authorize: true}) // 'authorize' optional middleware will be executed before post endpoint
    .put('/', put)
    .delete('/', deleteH)
);