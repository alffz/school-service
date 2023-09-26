import supertest from "supertest";
import web from "../src/app/web.js";
import {
  createUser,
  deleteUser,
  cookies,
  deleteTestPelajaran,
  createTestPelajaran,
  getTestPelajaran,
} from "./test-utils.js";

describe("POST /api/v1/pelajaran/", () => {
  it("should can create pelajaran", async () => {
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
      .post("/api/v1/pelajaran")
      .set("Cookie", `token=${cookie.token}`)
      .send({ pelajaran: "IPA" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject data pelajaran exist", async () => {
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
      .post("/api/v1/pelajaran")
      .set("Cookie", `token=${cookie.token}`)
      .send({ pelajaran: "IPA" });

    const result = await supertest(web)
      .post("/api/v1/pelajaran")
      .set("Cookie", `token=${cookie.token}`)
      .send({ pelajaran: "IPA" });

    expect(result.status).toBe(401);

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject field pelajaran not fill", async () => {
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
      .post("/api/v1/pelajaran")
      .set("Cookie", `token=${cookie.token}`)
      .send({ pelajaran: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("PUT /api/v1/pelajaran/:id", () => {
  it("should can update pelajaran", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestPelajaran("IPA");
    const { id } = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/pelajaran/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ pelajaran: "IPA" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can update pelajaran change", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestPelajaran("IPA");
    const { id } = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/pelajaran/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ pelajaran: "MM" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject pelajaran duplicate", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestPelajaran("IPA");
    await createTestPelajaran("IPS");
    const { id } = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/pelajaran/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ pelajaran: "IPS" });

    expect(result.status).toBe(409);

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject pelajaran not fill", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestPelajaran("IPA");
    const { id } = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/pelajaran/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ pelajaran: "" });

    expect(result.status).toBe(400);

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("DELETE /api/v1/pelajaran/:id", () => {
  it("should can update pelajaran", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestPelajaran("IPA");
    const { id } = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/pelajaran/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject pelajaran not found", async () => {
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
      .delete("/api/v1/pelajaran/" + 1)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject id not integer", async () => {
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
      .delete("/api/v1/pelajaran/wrong")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/kelas/:id", () => {
  it("should can get by id ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestPelajaran("IPA");
    const { id } = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/pelajaran/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject id not found", async () => {
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
      .get("/api/v1/pelajaran/" + 1)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject id not integer", async () => {
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
      .get("/api/v1/pelajaran/wrong")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/kelas", () => {
  it("should can get by default", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    for (let i = 1; i < 20; i++) {
      await createTestPelajaran(`pelajaran ${i}`);
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/pelajaran/")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.data).toBeDefined();
    expect(result.body.data.page.perPage).toBe(20);
    expect(result.body.data.page.total).toBe(19); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(1);

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
  it("should can get page perpage", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    for (let i = 1; i < 20; i++) {
      await createTestPelajaran(`pelajaran ${i}`);
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/pelajaran/")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 3, perPage: 5 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(5);
    expect(result.body.data.page.total).toBe(19); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(4);

    await deleteTestPelajaran();
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject page perpage are not number", async () => {
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
      .get("/api/v1/pelajaran/")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: "string", perPage: "string" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});
