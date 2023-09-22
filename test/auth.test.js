import supertest from "supertest";
import web from "../src/app/web.js";
import { createUser, deleteUser, cookies, getTestUser } from "./test-utils.js";
import bcrypt from "bcrypt";
describe("POST /api/v1/user/", () => {
  // admin
  it("should can login admin", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const result = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(result.header["set-cookie"]);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(cookie.token).toBeDefined();
    expect(cookie.refreshToken).toBeDefined();

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject email wrong ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const result = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "wrong@gmail.com", password: "123", role: "admin" });

    expect(result.status).toBe(401);
    expect(result.body.errors[0]).toBe("Username or password wrong");

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject email, password and role empty ", async () => {
    const result = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "", password: "", role: "" });

    expect(result.status).toBe(400);
  });

  it("should reject email empty ", async () => {
    const result = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "", password: "123", role: "admin" });

    expect(result.status).toBe(400);
  });

  it("should can login guru", async () => {
    await createUser({
      username: "rian",
      email: "rian@gmail.com",
      password: "321",
      role: "guru",
    });

    const result = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "rian@gmail.com", password: "321", role: "guru" });

    const cookie = cookies(result.header["set-cookie"]);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(cookie.token).toBeDefined();
    expect(cookie.refreshToken).toBeDefined();

    await deleteUser({ email: "rian@gmail.com", role: "guru" });
  });

  it("should can login murid", async () => {
    await createUser({
      username: "aira",
      email: "aira@gmail.com",
      password: "aira",
      role: "murid",
    });

    const result = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "aira@gmail.com", password: "aira", role: "murid" });

    const cookie = cookies(result.header["set-cookie"]);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(cookie.token).toBeDefined();
    expect(cookie.refreshToken).toBeDefined();

    await deleteUser({ email: "aira@gmail.com", role: "murid" });
  });
});

describe("POST /api/v1/user/refreshToken", () => {
  it("should can refreshToken ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "murid" });

    const cookie = cookies(login.header["set-cookie"]);

    const refreshToken = await supertest(web)
      .post("/api/v1/user/refreshToken")
      .set("Cookie", `refreshToken=${cookie.refreshToken}`);

    const refreshTokenCookie = cookies(refreshToken.header["set-cookie"]);

    expect(refreshToken.status).toBe(200);
    expect(refreshToken.body.message).toBe("SUCCESS");
    expect(refreshTokenCookie.token).toBeDefined();
    expect(refreshTokenCookie.refreshToken).toBeDefined();

    await deleteUser({ email: "admin@gmail.com", role: "murid" });
  });

  it("should reject refreshToken wrong  ", async () => {
    const refreshToken = await supertest(web)
      .post("/api/v1/user/refreshToken")
      .set("Cookie", `refreshToken=wrong}`);
    expect(refreshToken.status).toBe(401);
  });

  it("should reject refreshToken empty  ", async () => {
    const refreshToken = await supertest(web).post("/api/v1/user/refreshToken");
    expect(refreshToken.status).toBe(401);
  });

  // TODO
  // it("should reject refreshToken expired", async () => {
  //   const login = await supertest(web)
  //     .post("/api/v1/user/login")
  //     .send({ email: "admin@gmail.com", password: "123" });

  //   const cookie = cookies(login.header["set-cookie"]);

  //   const refreshToken = await supertest(web)
  //     .post("/api/v1/user/refreshToken")
  //     .set("Cookie", `refreshToken=${cookie.refreshToken}`);

  //   const refreshTokenCookie = cookies(refreshToken.header["set-cookie"]);

  //   expect(refreshToken.status).toBe(200);
  //   expect(refreshToken.body.message).toBe("SUCCESS");
  //   expect(refreshTokenCookie.token).toBeDefined();
  //   expect(refreshTokenCookie.refreshToken).toBeDefined();
  // });
});
