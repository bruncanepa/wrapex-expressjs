const {
  request,
  runServer,
  ERROR_CODE,
  SUCCESS_CODE, 
  API_ROUTE
} = require("./setUp");

describe("WrapexRouter tests", () => {
  const route = API_ROUTE;
  const asyncRoute = `${route}/async`;
  let server;

  beforeAll(async () => {
    server = await runServer();
  });

  afterAll(() => server.close());

  test("Invoke get success", async () => {
    const action = "get";
    const response = await request(action, route);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke get error", async () => {
    const action = "get";
    const response = await request(action, `${route}/error`);

    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  test("Invoke post success", async () => {
    const action = "post";
    const response = await request(action, route);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke post error", async () => {
    const action = "post";
    const response = await request(action, `${route}/error`);

    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  test("Invoke put success", async () => {
    const action = "put";
    const response = await request(action, route);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke put error", async () => {
    const action = "put";
    const response = await request(action, `${route}/error`);

    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  test("Invoke delete success", async () => {
    const action = "delete";
    const response = await request(action, route);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke delete error", async () => {
    const action = "delete";
    const response = await request(action, `${route}/error`);
    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  test("Invoke use success", async () => {
    const action = "get";
    const response = await request(action, `${route}/use`);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke use error", async () => {
    const action = "get";
    const response = await request(action, `${route}/useError`);

    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  //----------------------------------------

  test("Invoke async get success", async () => {
    const action = "get";
    const response = await request(action, asyncRoute);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke async get error", async () => {
    const action = "get";
    const response = await request(action, `${asyncRoute}/error`);

    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  test("Invoke async post success", async () => {
    const action = "post";
    const response = await request(action, asyncRoute);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke async post error", async () => {
    const action = "post";
    const response = await request(action, `${asyncRoute}/error`);

    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  test("Invoke async put success", async () => {
    const action = "put";
    const response = await request(action, asyncRoute);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke async put error", async () => {
    const action = "put";
    const response = await request(action, `${asyncRoute}/error`);

    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  test("Invoke async delete success", async () => {
    const action = "delete";
    const response = await request(action, asyncRoute);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke async delete error", async () => {
    const action = "delete";
    const response = await request(action, `${asyncRoute}/error`);
    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });

  test("Invoke async use success", async () => {
    const action = "get";
    const response = await request(action, `${asyncRoute}/use`);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke async use error", async () => {
    const action = "get";
    const response = await request(action, `${asyncRoute}/useError`);

    expect(response.status).toBe(ERROR_CODE);
    expect(response.success).toBe(false);
  });
  
});
