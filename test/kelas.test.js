import supertest from "supertest";
import web from "../src/app/web.js";
import {
  createUser,
  deleteUser,
  cookies,
  deleteTestRuangKelas,
  getTestRuangKelas,
  createTestRuangKelas,
  deleteAllTestKelas,
  createTestKelas,
  getTestKelas,
} from "./test-utils.js";

describe("POST /api/v1/kelas/", () => {
  it("should can create kelas", async () => {
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

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: "XII A" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can create multiple kelas on a ruang kelas", async () => {
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

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);
    const result = await supertest(web)
      .post("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: "XII A" });

    const result1 = await supertest(web)
      .post("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: "XII B" });

    expect(result.status).toBe(200);
    expect(result1.status).toBe(200);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject kelas duplicate", async () => {
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

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);
    await supertest(web)
      .post("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: "XII A" });

    const result = await supertest(web)
      .post("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: "XII A" });
    console.log(result.body.errors);
    console.log(result.error.text);
    expect(result.status).toBe(401);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject nomor ruang kelas not number", async () => {
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
      .post("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: "string", kelas: "XII A" });

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
      .post("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: "", kelas: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("PUT /api/v1/kelas/:id", () => {
  it("should can update kelas", async () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII A" });
    const { id_kelas } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id_kelas)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: "XII A" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can update kelas change", async () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII A" });
    const { id_kelas } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id_kelas)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: "XII B" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject kelas duplicate", async () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII A" });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII B" });
    const { id_kelas } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id_kelas)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: "VII B" });

    expect(result.status).toBe(409);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
  it("should reject nomor ruang kelas not number", async () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII A" });
    const { id_kelas } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id_kelas)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: "not number", kelas: "VII B" });

    expect(result.status).toBe(400);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
  it("should reject kelas not string", async () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII A" });
    const { id_kelas } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id_kelas)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: 1, kelas: 1 });

    expect(result.status).toBe(400);

    await deleteAllTestKelas();
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII A" });
    const { id_kelas } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id_kelas)
      .set("Cookie", `token=${cookie.token}`)
      .send({ nomor_ruang_kelas: "", kelas: "" });

    expect(result.status).toBe(400);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("DELETE /api/v1/kelas/:id", () => {
  it("should can delete kelas", async () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII A" });
    const { id_kelas } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/kelas/" + id_kelas)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    // await deleteAllTestKelas();
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
      .delete("/api/v1/kelas/" + 1)
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
      .delete("/api/v1/kelas/notInteger")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/kelas/:id", () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "VII A" });
    const { id_kelas } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/kelas/" + id_kelas)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject kelas not found", async () => {
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

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/kelas/" + 1)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);

    await deleteTestRuangKelas(1);
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
      .get("/api/v1/kelas/notnuber")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/kelas", () => {
  it("should can get kelas by default", async () => {
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

    // create multiple kelas
    for (let i = 0; i < 40; i++) {
      await createTestKelas({ nomor_ruang_kelas: 1, kelas: `XII A${i}` });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.data).toBeDefined();
    expect(result.body.data.page.perPage).toBe(20);
    expect(result.body.data.page.total).toBe(40); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(2);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can get kelas with page,perpage", async () => {
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

    // create multiple kelas
    for (let i = 0; i < 40; i++) {
      await createTestKelas({ nomor_ruang_kelas: 1, kelas: `XII A${i}` });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: 10 });
    console.log(result.error.text);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.data.data).toBeDefined();
    expect(result.body.data.page.perPage).toBe(10);
    expect(result.body.data.page.total).toBe(40); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(4);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can get kelas with page,perpagem and kelas", async () => {
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

    // create multiple kelas
    for (let i = 0; i < 40; i++) {
      await createTestKelas({ nomor_ruang_kelas: 1, kelas: `XII A${i}` });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: 10, kelas: "XII A10" });
    console.log(result.error.text);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.data.data).toBeDefined();
    expect(result.body.data.page.perPage).toBe(10);
    expect(result.body.data.page.total).toBe(1); // coz loop < 40
    expect(result.body.data.page.totalPage).toBe(1);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject page not number", async () => {
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
      .get("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: "not number", perPage: 10, kelas: "XII A10" });
    console.log(result.error);
    console.log(result.body.data);
    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject perPage not number", async () => {
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
      .get("/api/v1/kelas")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: "not number", kelas: "XII A10" });
    console.log(result.body);
    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});
