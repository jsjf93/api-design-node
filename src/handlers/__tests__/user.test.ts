import * as user from "../user";

describe("user handling", () => {
  it("should create a new user", async () => {
    const req = { body: { username: "hello@test.test", password: "hi" } };
    const res = {};
    const next = () => {};

    await user.createNewUser(req, res, next);

    console.log(res);
  });
});
