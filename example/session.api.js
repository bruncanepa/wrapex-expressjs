function get(req, res) {
  res.send(req.useMide);
}

function post(req, res) {
  res.send(req.useMide);
}

function deleteH(req, res) {
  res.send(req.useMide);
}

function put(req, res) {
  res.send(req.useMide);
}

function use(req, res) {
  res.send(req.useMide);
}

function useMid(req, res, next) {
  req.useMide = true;
  next();
}

module.exports = router => {
  router
    .use(useMid)
    .use("/use", use)
    .get("/", get)
    .post("/", post, { authorize: true }) // 'authorize' optional middleware will be executed before post endpoint
    .put("/", put)
    .delete("/", deleteH);
};
