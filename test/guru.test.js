import supertest from "supertest";
import web from "../src/app/web.js";
import {
  createUser,
  deleteUser,
  cookies,
  getTestUser,
  createTestKelas,
  createTestRuangKelas,
  getTestKelas,
  deleteTestRuangKelas,
  deleteAllTestKelas,
  createTestGuru,
} from "./test-utils.js";

describe("POST /api/v1/guru/", () => {
  it("should can create guru", async () => {
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
      .post("/api/v1/guru")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "guru", email: "guru@gmail.com", password: "123" });
    console.log(result.body.errors);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject duplicate email guru", async () => {
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
      .post("/api/v1/guru")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "guru", email: "guru@gmail.com", password: "123" });

    const result = await supertest(web)
      .post("/api/v1/guru")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "guru", email: "guru@gmail.com", password: "123" });

    expect(result.status).toBe(401);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
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
      .post("/api/v1/guru")
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
      .post("/api/v1/guru")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "alfrians", email: "af@me.com", password: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("PATCH /api/v1/guru/:id", () => {
  it("role admin should can update all fields ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A" });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const kelas = await getTestKelas("SI A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
        id_kelas: kelas.id,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "foo@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("role admin should can update only password ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A" });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const kelas = await getTestKelas("SI A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "guru",
        email: "guru@gmail.com",
        password: "321",
        id_kelas: kelas.id,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("role admin should can update without id_kelas ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteTestRuangKelas(1);
    await deleteUser({ email: "foo@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("role admin should reject email already used by other ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createUser({
      username: "guru",
      email: "guru2@gmail.com",
      password: "123",
      role: "guru",
    });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "guru2@gmail.com",
        password: "321",
        id_kelas: 1,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(409);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "guru2@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
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
      .patch("/api/v1/guru/" + 1)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "guru2@gmail.com",
        password: "321",
        id_kelas: 1,
      });
    console.log(result.status);
    console.log(result.body.errors);
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

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "",
        email: "",
        password: "",
        // id_kelas: 1,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(400);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject some field not fill ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "",
        email: "alf@gmail.com",
        password: "",
        // id_kelas: 1,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(400);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject email not valid ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "alfri",
        email: "alfri",
        password: "213",
        // id_kelas: 1,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(400);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("role guru should can update username email password", async () => {
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A" });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const kelas = await getTestKelas("SI A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
        // id_kelas: kelas.id,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "foo@gmail.com", role: "guru" });
  });

  it("role guru should can update some fields", async () => {
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A" });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const kelas = await getTestKelas("SI A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "guru",
        email: "foo@gmail.com",
        password: "321",
        // id_kelas: kelas.id,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "foo@gmail.com", role: "guru" });
  });

  it("role guru should reject update id_kelas", async () => {
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .patch("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
        id_kelas: 1,
      });
    console.log(result.status);
    console.log(result.body.errors);
    expect(result.status).toBe(400);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
  });
});

describe("DELETE /api/v1/guru/:id", () => {
  it("should can delete admin ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    // const

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject guru not found", async () => {
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
      .delete("/api/v1/guru/" + 1)
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
      .delete("/api/v1/guru/wrong")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/guru/:id", () => {
  it("admin should can get guru", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A" });
    const kelas = await getTestKelas("SI A");

    await createTestGuru({
      username: `guru`,
      email: `guru@gmail.com`,
      password: "123",
      id_kelas: kelas.id,
    });

    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);
    console.log(cookie.token);
    const result = await supertest(web)
      .get("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`);
    console.log(result.body.errors);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("guru should can get guru", async () => {
    await createUser({
      username: "alfri",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI B" });
    const kelas = await getTestKelas("SI B");

    await createTestGuru({
      username: `guru`,
      email: `guru1@gmail.com`,
      password: "123",
      id_kelas: kelas.id,
    });

    const { id } = await getTestUser({
      email: "guru1@gmail.com",
      role: "guru",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);
    console.log(cookie.token);
    const result = await supertest(web)
      .get("/api/v1/guru/" + id)
      .set("Cookie", `token=${cookie.token}`);
    console.log(result.body.errors);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "guru1@gmail.com", role: "guru" });
  });

  it("should reject id not integer", async () => {
    await createUser({
      username: "alfri",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/guru/wrong")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
  });

  it("should reject guru not found", async () => {
    await createUser({
      username: "alfri",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/guru/10")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
  });
});

describe("GET /api/v1/guru", () => {
  it("admin should can get guru", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    for (let i = 1; i <= 20; i++) {
      await createUser({
        username: `guru ${i}`,
        email: `guru${i}@gmail.com`,
        password: "123",
        role: "guru",
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/guru")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 4, perPage: 5 });

    console.log(result.body.errors);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(5);
    expect(result.body.data.page.total).toBe(20);
    expect(result.body.data.page.totalPage).toBe(4);
    expect(result.body.data.page.current).toBe(4);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
    for (let i = 1; i <= 20; i++) {
      await deleteUser({ email: `guru${i}@gmail.com`, role: "guru" });
    }
  });

  it("guru should can get guru", async () => {
    await createUser({
      username: "alfri",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });
    for (let i = 1; i <= 20; i++) {
      await createUser({
        username: `guru ${i}`,
        email: `guru${i}@gmail.com`,
        password: "123",
        role: "guru",
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/guru")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 4, perPage: 5 });

    console.log(result.body.errors);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(5);
    expect(result.body.data.page.total).toBe(21);
    expect(result.body.data.page.totalPage).toBe(5);
    expect(result.body.data.page.current).toBe(4);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    for (let i = 1; i <= 20; i++) {
      await deleteUser({ email: `guru${i}@gmail.com`, role: "guru" });
    }
  });

  it("murid should can get guru", async () => {
    await createUser({
      username: "alfri",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A Siang" });
    const { id } = await getTestKelas("SI A Siang");

    for (let i = 1; i <= 20; i++) {
      await createTestGuru({
        username: `guru ${i}`,
        email: `guru${i}@gmail.com`,
        password: "123",
        id_kelas: id,
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/guru")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: 5 });

    console.log(result.body.errors);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(5);
    expect(result.body.data.page.total).toBe(21);
    expect(result.body.data.page.totalPage).toBe(5);
    expect(result.body.data.page.current).toBe(1);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    for (let i = 1; i <= 20; i++) {
      await deleteUser({ email: `guru${i}@gmail.com`, role: "guru" });
    }
    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
  });

  it("should can get by default", async () => {
    await createUser({
      username: "alfri",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A Siang" });
    const { id } = await getTestKelas("SI A Siang");

    for (let i = 1; i <= 20; i++) {
      await createTestGuru({
        username: `guru ${i}`,
        email: `guru${i}@gmail.com`,
        password: "123",
        id_kelas: id,
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/guru")
      .set("Cookie", `token=${cookie.token}`);

    console.log(result.body.errors);
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(20);
    expect(result.body.data.page.total).toBe(21);
    expect(result.body.data.page.totalPage).toBe(2);
    expect(result.body.data.page.current).toBe(1);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    for (let i = 1; i <= 20; i++) {
      await deleteUser({ email: `guru${i}@gmail.com`, role: "guru" });
    }
    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
  });
});
