const UserService = require("../user_service");
const UserClient = require("../user_client");

jest.mock("../user_client");

describe("login-test", () => {
  const login = jest.fn(async () => "success");
  UserClient.mockImplementation(() => {
    return {
      login,
    };
  });

  let userService;
  beforeEach(() => {
    userService = new UserService(new UserClient());
    login.mockClear();
    UserClient.mockClear();
  });

  it("calls login() on UserClient when tries to login", async () => {
    await userService.login("ses2201", "ses22012000");
    expect(login.mock.calls.length).toBe(1);
  });

  it("should not call login() onUserClient again if already logged in", async () => {
    await userService.login("ses2201", "ses22012000");
    await userService.login("ses2201", "ses22012000");
    expect(login.mock.calls.length).toBe(1);
  });
});
