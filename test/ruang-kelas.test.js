import supertest from "supertest";
import web from "../src/app/web.js";
import {
  createUser,
  deleteUser,
  cookies,
  deleteTestRuangKelas,
  getTestRuangKelas,
  createTestRuangKelas,
} from "./test-utils.js";

describe("POST /api/v1/ruang-kelas/", () => {
  it("should can create ruang kelas", async () => {
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
      .post("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: 1, kapasitas: 30 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject nomor_ruangan duplicate", async () => {
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
      .post("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: 1, kapasitas: 30, tersedia: true });

    const result = await supertest(web)
      .post("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: 1, kapasitas: 30, tersedia: true });

    expect(result.status).toBe(401);

    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
  it("should reject nomor_ruangan not number", async () => {
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
      .post("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: "not number", kapasitas: 30, tersedia: false });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
  it("should reject tersedia not boolean", async () => {
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
      .post("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: "not number", kapasitas: 30, tersedia: 2 });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject fields empty", async () => {
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
      .post("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: "", kapasitas: "", tersedia: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("PUT /api/v1/ruang-kelas/:id", () => {
  it("should can update ruang kelas", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });
    const { id } = await getTestRuangKelas();

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/ruang-kelas/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: 1, kapasitas: 30, tersedia: true });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject nomor_ruangan duplicate", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });
    await createTestRuangKelas({
      nomor_ruangan: 2,
      kapasitas: 30,
      tersedia: true,
    });
    const { id } = await getTestRuangKelas();

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/ruang-kelas/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: 2, kapasitas: 30, tersedia: true });

    expect(result.status).toBe(409);

    await deleteTestRuangKelas(1);
    await deleteTestRuangKelas(2);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
  it("should reject nomor_ruangan not number", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });
    const { id } = await getTestRuangKelas();

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/ruang-kelas/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: "not number", kapasitas: 30, tersedia: true });

    expect(result.status).toBe(400);

    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject tersedia not boolean", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });
    const { id } = await getTestRuangKelas();

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/ruang-kelas/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: 1, kapasitas: 30, tersedia: 1 });

    expect(result.status).toBe(400);

    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject fields empty", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });
    const { id } = await getTestRuangKelas();

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/ruang-kelas/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruangan: "", kapasitas: "", tersedia: "" });

    expect(result.status).toBe(400);

    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("DELETE /api/v1/ruang-kelas/:id", () => {
  it("should can delete ruang kelas", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });
    const { id } = await getTestRuangKelas();

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/ruang-kelas/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject ruang kelas not found", async () => {
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
      .delete("/api/v1/ruang-kelas/" + 1)
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
      .delete("/api/v1/ruang-kelas/notInteger")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/ruang-kelas/:id", () => {
  it("should can get ruang kelas by id", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });
    const { id } = await getTestRuangKelas();

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/ruang-kelas/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.nomor_ruangan).toBeDefined();
    expect(result.body.data.kapasitas).toBeDefined();
    expect(result.body.data.tersedia).toBeDefined();

    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject ruang kelas not found", async () => {
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
      .get("/api/v1/ruang-kelas/" + 1)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject id not number ", async () => {
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
      .get("/api/v1/ruang-kelas/notnuber")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/ruang-kelas", () => {
  it("should can get ruang kelas by default", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    for (let i = 1; i < 40; i++) {
      await createTestRuangKelas({
        nomor_ruangan: i,
        kapasitas: i,
        tersedia: true,
      });
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.data).toBeDefined();
    expect(result.body.data.page.perPage).toBe(20);
    expect(result.body.data.page.total).toBe(39); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(2);

    for (let i = 1; i < 40; i++) {
      await deleteTestRuangKelas(i);
    }
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can get ruang kelas with page,perpage", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    for (let i = 1; i < 40; i++) {
      await createTestRuangKelas({
        nomor_ruangan: i,
        kapasitas: i,
        tersedia: true,
      });
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: 10 });

    expect(result.status).toBe(200);
    expect(result.body.data.data).toBeDefined();
    expect(result.body.data.page.perPage).toBe(10);
    expect(result.body.data.page.total).toBe(39); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(4);
    expect(result.body.data.page.current).toBe(1);

    for (let i = 1; i < 40; i++) {
      await deleteTestRuangKelas(i);
    }
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can get ruang kelas with page,perpage and sort desc", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    for (let i = 1; i < 40; i++) {
      await createTestRuangKelas({
        nomor_ruangan: i,
        kapasitas: i,
        tersedia: true,
      });
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: 10, sort: "desc" });

    expect(result.status).toBe(200);
    expect(result.body.data.data).toBeDefined();
    expect(result.body.data.page.perPage).toBe(10);
    expect(result.body.data.page.total).toBe(39); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(4);
    expect(result.body.data.page.current).toBe(1);

    for (let i = 1; i < 40; i++) {
      await deleteTestRuangKelas(i);
    }
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can get ruang kelas with page,perpage", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    for (let i = 1; i < 40; i++) {
      await createTestRuangKelas({
        nomor_ruangan: i,
        kapasitas: i,
        tersedia: true,
      });
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: 10, kapasitas: 10 });

    expect(result.status).toBe(200);
    expect(result.body.data.data).toBeDefined();
    expect(result.body.data.page.perPage).toBe(10);
    expect(result.body.data.page.total).toBe(1); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(1);
    expect(result.body.data.page.current).toBe(1);

    for (let i = 1; i < 40; i++) {
      await deleteTestRuangKelas(i);
    }
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject query params not number", async () => {
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
      .get("/api/v1/ruang-kelas")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: "str", perPage: "str", kapasitas: "str" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});
