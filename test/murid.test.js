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
  createTestMurid,
} from "./test-utils.js";

describe("POST /api/v1/murid/", () => {
  it("should can create murid", async () => {
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
      .post("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "murid", email: "murid@gmail.com", password: "123" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should can create murid with id_kelas", async () => {
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
    const { id } = await getTestKelas("SI A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "murid",
        email: "murid@gmail.com",
        password: "123",
        id_kelas: id,
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "murid@gmail.com", role: "murid" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject duplicate email murid", async () => {
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
      .post("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "murid", email: "murid@gmail.com", password: "123" });

    const result = await supertest(web)
      .post("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "murid", email: "murid@gmail.com", password: "123" });

    expect(result.status).toBe(401);

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
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
      .post("/api/v1/murid")
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
      .post("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "alfrians", email: "af@me.com", password: "" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject email not valid", async () => {
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
      .post("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .send({ username: "alfrians", email: "afsd", password: "123" });

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("PUT /api/v1/murid/:id", () => {
  it("role admin should can update all fields ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A" });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });
    const kelas = await getTestKelas("SI A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
        id_kelas: kelas.id,
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "foo@gmail.com", role: "murid" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("role admin should can update only password fields ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A" });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });
    const kelas = await getTestKelas("SI A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "murid",
        email: "murid@gmail.com",
        password: "321",
        id_kelas: kelas.id,
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "murid@gmail.com", role: "murid" });
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
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "foo@gmail.com", role: "murid" });
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
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    await createUser({
      username: "murid",
      email: "murid2@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "murid2@gmail.com",
        password: "321",
        id_kelas: 1,
      });

    expect(result.status).toBe(409);

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
    await deleteUser({ email: "murid2@gmail.com", role: "murid" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
  it("should reject murid not found", async () => {
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
      .patch("/api/v1/murid/" + 1)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "guru2@gmail.com",
        password: "321",
        id_kelas: 1,
      });

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
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const murid = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + murid.id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "",
        email: "",
        password: "",
        id_kelas: 1,
      });

    expect(result.status).toBe(400);

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
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
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "",
        email: "alf@gmail.com",
        password: "",
      });

    expect(result.status).toBe(400);

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
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
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "alfri",
        email: "alfri",
        password: "213",
      });

    expect(result.status).toBe(400);

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("role murid should can update username email password", async () => {
    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });
    // console.log(id);
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "murid@gmail.com", password: "123", role: "murid" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "foo@gmail.com", role: "murid" });
  });

  it("role murid should reject update id_kelas", async () => {
    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 10,
      tersedia: true,
    });

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A" });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });
    const kelas = await getTestKelas("SI A");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "murid@gmail.com", password: "123", role: "murid" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
        id_kelas: kelas.id,
      });

    expect(result.status).toBe(400);

    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "murid@gmail.com", role: "murid" });
  });

  it("role murid reject update other murid data", async () => {
    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    await createUser({
      username: "murid",
      email: "murid1@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid1@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "murid@gmail.com", password: "123", role: "murid" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .put("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        username: "foo",
        email: "foo@gmail.com",
        password: "321",
      });

    expect(result.status).toBe(403);

    await deleteUser({ email: "murid1@gmail.com", role: "murid" });
    await deleteUser({ email: "murid@gmail.com", role: "murid" });
  });
});

describe("DELETE /api/v1/guru/:id", () => {
  it("should can delete murid ", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .delete("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("should reject murid not found", async () => {
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
      .delete("/api/v1/murid/" + 1)
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
      .delete("/api/v1/murid/wrong")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(400);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});

describe("GET /api/v1/murid/:id", () => {
  it("admin should can get by id", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });

  it("guru should can get by id", async () => {
    await createUser({
      username: "alfri",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
    await deleteUser({ email: "guru@gmail.com", role: "guru" });
  });

  it("murid should can get by id", async () => {
    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "murid@gmail.com", password: "123", role: "murid" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
  });
  it("murid should reject to get other murid by id", async () => {
    await createUser({
      username: "murid",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    await createUser({
      username: "murid",
      email: "murid2@gmail.com",
      password: "123",
      role: "murid",
    });

    const { id } = await getTestUser({
      email: "murid2@gmail.com",
      role: "murid",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "murid@gmail.com", password: "123", role: "murid" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/murid/" + id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(403);

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
    await deleteUser({ email: "murid2@gmail.com", role: "murid" });
  });
});

describe("GET /api/v1/murid", () => {
  it("admin should can get murid", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });
    for (let i = 1; i <= 20; i++) {
      await createUser({
        username: `murid ${i}`,
        email: `murid${i}@gmail.com`,
        password: "123",
        role: "murid",
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 4, perPage: 5 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(5);
    expect(result.body.data.page.total).toBe(20);
    expect(result.body.data.page.totalPage).toBe(4);
    expect(result.body.data.page.current).toBe(4);

    await deleteUser({ email: "admin@gmail.com", role: "admin" });
    for (let i = 1; i <= 20; i++) {
      await deleteUser({ email: `murid${i}@gmail.com`, role: "murid" });
    }
  });

  it("guru should can get murid", async () => {
    await createUser({
      username: "alfri",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });
    for (let i = 1; i <= 20; i++) {
      await createUser({
        username: `murid ${i}`,
        email: `murid${i}@gmail.com`,
        password: "123",
        role: "murid",
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: 5 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(5);
    expect(result.body.data.page.total).toBe(20);
    expect(result.body.data.page.totalPage).toBe(4);
    expect(result.body.data.page.current).toBe(1);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    for (let i = 1; i <= 20; i++) {
      await deleteUser({ email: `murid${i}@gmail.com`, role: "murid" });
    }
  });

  it("murid should can get murid", async () => {
    await createUser({
      username: "alfri",
      email: "murid@gmail.com",
      password: "123",
      role: "murid",
    });

    await createTestRuangKelas({
      nomor_ruangan: 1,
      kapasitas: 30,
      tersedia: true,
    });

    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "SI A Siang" });
    const { id } = await getTestKelas("SI A Siang");

    for (let i = 1; i < 20; i++) {
      await createTestMurid({
        username: `murid ${i}`,
        email: `murid${i}@gmail.com`,
        password: "123",
        id_kelas: id,
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "murid@gmail.com", password: "123", role: "murid" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 1, perPage: 10 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(10);
    expect(result.body.data.page.total).toBe(20);
    expect(result.body.data.page.totalPage).toBe(2);
    expect(result.body.data.page.current).toBe(1);

    await deleteUser({ email: "murid@gmail.com", role: "murid" });
    for (let i = 1; i < 20; i++) {
      await deleteUser({ email: `murid${i}@gmail.com`, role: "murid" });
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
      await createTestMurid({
        username: `murid ${i}`,
        email: `murid${i}@gmail.com`,
        password: "123",
        id_kelas: id,
      });
    }
    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/murid")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(20);
    expect(result.body.data.page.total).toBe(20);
    expect(result.body.data.page.totalPage).toBe(1);
    expect(result.body.data.page.current).toBe(1);

    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    for (let i = 1; i <= 20; i++) {
      await deleteUser({ email: `murid${i}@gmail.com`, role: "murid" });
    }
    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
  });
});
