import supertest from "supertest";
import web from "../src/app/web.js";
import {
  createUser,
  deleteUser,
  cookies,
  deleteTestRuangKelas,
  createTestRuangKelas,
  deleteAllTestKelas,
  createTestKelas,
  getTestKelas,
  createTestMurid,
  deleteAllMurid,
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
    const { id } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id)
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
    const { id } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id)
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
    const { id } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id)
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
    const { id } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id)
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
    const { id } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id)
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
    const { id } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/kelas/" + id)
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
    const { id } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/kelas/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
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
    const { id } = await getTestKelas("VII A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/kelas/" + id)
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

describe("GET /api/v1/:id/murid", () => {
  it("should can get murid at a class", async () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: `XII A` });
    const { id } = await getTestKelas(`XII A`);

    for (let i = 1; i < 10; i++) {
      await createTestMurid({
        username: `murid ${i}`,
        email: "email" + i,
        password: "123",
        id_kelas: id,
      });
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get(`/api/v1/${id}/murid`)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.kelas).toBeDefined();
    expect(result.body.data.murid).toBeDefined();

    await deleteAllMurid();
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

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get(`/api/v1/${1}/murid`)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can get murid at a class", async () => {
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

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: `XII A` });
    const { id } = await getTestKelas(`XII A`);

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get(`/api/v1/${id}/murid`)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});
