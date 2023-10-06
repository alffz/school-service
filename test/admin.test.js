import supertest from "supertest";
import web from "../src/app/web.js";
import { createUser, deleteUser, cookies, getTestUser } from "./test-utils.js";
import bcrypt from "bcrypt";
describe("POST /api/v1/admin/", () => {
  it("should can create admin", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/admin")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "admin1", email: "admin1@gmail.com", password: "123" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.username).toBe("admin1");

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
    await deleteUser({ email: "admin1@gmail.com", role: "admin" });
  });

  it("should reject duplicate email admin", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    await supertest(web)
      .post("/api/v1/admin")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "admin1", email: "admin1@gmail.com", password: "123" });

    const result = await supertest(web)
      .post("/api/v1/admin")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "admin1", email: "admin1@gmail.com", password: "123" });

    expect(result.status).toBe(401);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
    await deleteUser({ email: "admin1@gmail.com", role: "admin" });
  });

  it("should reject fileds empty", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/admin")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "", email: "", password: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject some filed empty", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/admin")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "alfrians", email: "af@me.com", password: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("PATCH /api/v1/admin/:id", () => {
  it("should can update email ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const { id } = await getTestUser({
      email: "admin@gmail.com",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/admin/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "foo", email: "admin1@gmail.com", password: "123" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "admin1@gmail.com", role: "admin" });
  });

  it("should can update username and password ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const { id } = await getTestUser({
      email: "admin@gmail.com",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/admin/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "bar", email: "admin@gmail.com", password: "abc" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject email already used by other ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    await createUser({
      username: "alfri",
      email: "admin1@gmail.com",
      password: "123",
      role: "admin",
    });

    const { id } = await getTestUser({
      email: "admin@gmail.com",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/admin/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "foo", email: "admin1@gmail.com", password: "123" });

    expect(result.status).toBe(409);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
    await deleteUser({ email: "admin1@gmail.com", role: "admin" });
  });
  it("should reject admin not found", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/admin/" + 1)
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "foo", email: "admin1@gmail.com", password: "123" });

    expect(result.status).toBe(404);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject fields not fill ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    const { id } = await getTestUser({
      email: "admin@gmail.com",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/admin/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "", email: "", password: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject some field not fill ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    const { id } = await getTestUser({
      email: "admin@gmail.com",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/admin/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "admin", email: "admin@gmail.com", password: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject email not valid ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    const { id } = await getTestUser({
      email: "admin@gmail.com",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/admin/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "admin", email: "admin", password: "123" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("DELETE /api/v1/admin/:id", () => {
  it("should can delete admin ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const { id } = await getTestUser({
      email: "admin@gmail.com",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/admin/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });

  it("should reject admin not found", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/admin/" + 1)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject id not not valid", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/admin/wrong")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/admin/", () => {
  it("should can get admin by default", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    for (let i = 1; i < 20; i++) {
      await createUser({
        username: `user ${i}`,
        email: `admin${i}@gmail.com`,
        password: "123",
        role: "admin",
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/admin")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.size).toBe(20);
    expect(result.body.data.page.total).toBe(20);
    expect(result.body.data.page.totalPage).toBe(1);
    expect(result.body.data.page.current).toBe(1);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
    for (let i = 1; i < 20; i++) {
      await deleteUser({ email: `admin${i}@gmail.com`, role: "admin" });
    }
  });

  it("should can get admin", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    for (let i = 1; i < 20; i++) {
      await createUser({
        username: `user ${i}`,
        email: `admin${i}@gmail.com`,
        password: "123",
        role: "admin",
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/admin")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 4, perPage: 5 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.size).toBe(5);
    expect(result.body.data.page.total).toBe(20);
    expect(result.body.data.page.totalPage).toBe(4);
    expect(result.body.data.page.current).toBe(4);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
    for (let i = 1; i < 20; i++) {
      await deleteUser({ email: `admin${i}@gmail.com`, role: "admin" });
    }
  });
});
