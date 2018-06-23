const { request, SUCCESS_CODE } = require("../utils");
const runServer = require("../../example");

describe("Wrapex tests", () => {
  const PORT = 3002;
  const route = `http://localhost:${PORT}/api/session`;
  let server;

  beforeAll(async () => {
    server = await runServer(PORT);
  });

  afterAll(() => server.close());

  test("Invoke get success", async () => {
    const action = "get";
    const response = await request(action, route);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke post success", async () => {
    const action = "post";
    const body = { password: 'password' };
    const response = await request(action, route, body);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke post error - no permission", async () => {
    const action = "post";
    const response = await request(action, route);

    expect(response.status).toBe(401);
  });

  test("Invoke put success", async () => {
    const action = "put";
    const response = await request(action, route);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke delete success", async () => {
    const action = "delete";
    const response = await request(action, route);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });

  test("Invoke use success", async () => {
    const action = "get";
    const response = await request(action, `${route}/use`);

    expect(response.status).toBe(SUCCESS_CODE);
    expect(response.data).toBe(true);
  });
});
