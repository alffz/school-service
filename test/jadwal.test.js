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
  createTestMurid,
  createTestPelajaran,
  getTestPelajaran,
  deleteAllJadwal,
  deleteTestPelajaran,
  deleteAllGuru,
  deleteAllKelas,
  deleteAllRuangKelas,
  deleteAllAdmin,
  getTestJadawl,
  createTestJadwal,
} from "./test-utils.js";

describe("POST /api/v1/jadwal/", () => {
  afterEach(async () => {
    await deleteAllJadwal();
    await deleteTestPelajaran();

    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can create jadwal", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });
    await createTestPelajaran("IPA");

    const kelas = await getTestKelas("A");
    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const pelajaran = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/jadwal")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_pelajaran: pelajaran.id,
        id_guru: id,
        id_kelas: kelas.id,
        hari: 1,
        mulai: { jam: 8, menit: 0 },
        berakhir: { jam: 9, menit: 0 },
        status: true,
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });
  it("should can create jadwal for different jam", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "B" });

    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    await createUser({
      username: "guru",
      email: "guru1@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestPelajaran("IPA");
    await createTestPelajaran("MM");

    const kelas = await getTestKelas("A");
    const kelasB = await getTestKelas("B");
    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const guru1 = await getTestUser({
      email: "guru1@gmail.com",
      role: "guru",
    });

    const pelajaran = await getTestPelajaran("IPA");
    const MM = await getTestPelajaran("MM");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    await supertest(web)
      .post("/api/v1/jadwal")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_pelajaran: pelajaran.id,
        id_guru: id, // nur
        id_kelas: kelas.id, // kelas a
        hari: 1,
        mulai: { jam: 8, menit: 0 },
        berakhir: { jam: 9, menit: 0 },
        status: true,
      });

    const result = await supertest(web)
      .post("/api/v1/jadwal")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_pelajaran: pelajaran.id,
        id_guru: id, // aira
        id_kelas: kelas.id, // kelas a
        hari: 1,
        mulai: { jam: 10, menit: 0 },
        berakhir: { jam: 11, menit: 0 },
        status: true,
      });

    expect(result.status).toBe(200);

    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteUser({ email: "guru@gmail.com", role: "guru" });
    await deleteUser({ email: "guru1@gmail.com", role: "guru" });
    await deleteAllTestKelas();
    await deleteTestRuangKelas(1);
    await deleteUser({ email: "admin@gmail.com", role: "admin" });
  });
});
describe("PUT /api/v1/jadwal/", () => {
  afterEach(async () => {
    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can update jadwal", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });
    await createTestPelajaran("IPA");

    const kelas = await getTestKelas("A");
    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const pelajaran = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    await supertest(web)
      .post("/api/v1/jadwal")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_pelajaran: pelajaran.id,
        id_guru: id,
        id_kelas: kelas.id,
        hari: 1,
        mulai: { jam: 8, menit: 0 },
        berakhir: { jam: 9, menit: 0 },
        status: true,
      });

    const jadwal = await getTestJadawl();

    const result = await supertest(web)
      .put("/api/v1/jadwal/" + jadwal.id)
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_pelajaran: pelajaran.id,
        id_guru: id,
        id_kelas: kelas.id,
        hari: 2,
        mulai: { jam: 12, menit: 0 },
        berakhir: { jam: 13, menit: 0 },
        status: true,
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });

  it("should reject jadwal not found", async () => {
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
      .put("/api/v1/jadwal/" + 1)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/v1/jadwal/", () => {
  afterEach(async () => {
    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can delete jadwal", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });
    await createTestPelajaran("IPA");

    const kelas = await getTestKelas("A");
    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const pelajaran = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    await supertest(web)
      .post("/api/v1/jadwal")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_pelajaran: pelajaran.id,
        id_guru: id,
        id_kelas: kelas.id,
        hari: 1,
        mulai: { jam: 8, menit: 0 },
        berakhir: { jam: 9, menit: 0 },
        status: true,
      });

    const jadwal = await getTestJadawl();

    const result = await supertest(web)
      .delete("/api/v1/jadwal/" + jadwal.id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });

  it("should reject jadwal not found", async () => {
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
      .delete("/api/v1/jadwal/" + 1)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/v1/jadwal/:id", () => {
  afterEach(async () => {
    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can get jadwal by id", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });
    await createTestPelajaran("IPA");

    const kelas = await getTestKelas("A");
    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const pelajaran = await getTestPelajaran("IPA");

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    await supertest(web)
      .post("/api/v1/jadwal")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_pelajaran: pelajaran.id,
        id_guru: id,
        id_kelas: kelas.id,
        hari: 1,
        mulai: { jam: 8, menit: 0 },
        berakhir: { jam: 9, menit: 0 },
        status: true,
      });

    const jadwal = await getTestJadawl();

    const result = await supertest(web)
      .get("/api/v1/jadwal/" + jadwal.id)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });

  it("should reject jadwal not found", async () => {
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
      .get("/api/v1/jadwal/" + 1)
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/v1/jadwal/hari/:hari?page=1&perpage=20", () => {
  afterEach(async () => {
    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can get jadwal by hari default", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });
    await createTestPelajaran("IPA");

    const kelas = await getTestKelas("A");
    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const pelajaran = await getTestPelajaran("IPA");

    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 40; j++) {
        await createTestJadwal({
          id_pelajaran: pelajaran.id,
          id_guru: id,
          id_kelas: kelas.id,
          hari: i,
          mulai: { jam: 8, menit: 0 },
          berakhir: { jam: 9, menit: 0 },
        });
      }
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/jadwal/hari/senin")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(20);
    expect(result.body.data.page.total).toBe(40);
    expect(result.body.data.page.totalPage).toBe(2);
    expect(result.body.data.page.current).toBe(1);
  });

  it("should can get jadwal by hari page and perpage", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });
    await createTestPelajaran("IPA");

    const kelas = await getTestKelas("A");
    const { id } = await getTestUser({ email: "guru@gmail.com", role: "guru" });
    const pelajaran = await getTestPelajaran("IPA");

    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 40; j++) {
        await createTestJadwal({
          id_pelajaran: pelajaran.id,
          id_guru: id,
          id_kelas: kelas.id,
          hari: i,
          mulai: { jam: 8, menit: 0 },
          berakhir: { jam: 9, menit: 0 },
        });
      }
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/jadwal/hari/senin")
      .set("Cookie", `token=${cookie.token}`)
      .query({ page: 4, perPage: 5 });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
    expect(result.body.data.page.perPage).toBe(5);
    expect(result.body.data.page.total).toBe(40);
    expect(result.body.data.page.totalPage).toBe(8);
    expect(result.body.data.page.current).toBe(4);
  });

  it("should reject jadwal not found", async () => {
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
      .get("/api/v1/jadwal/hari/senin")
      .set("Cookie", `token=${cookie.token}`);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/v1/jadwal/guru", () => {
  afterEach(async () => {
    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can get jadwal by guru default jalhfuai", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createUser({
      username: "sinmay",
      email: "sinmay@gmail.com",
      password: "123",
      role: "guru",
    });
    await createUser({
      username: "rudi",
      email: "rudi@gmail.com",
      password: "123",
      role: "guru",
    });
    await createUser({
      username: "bambang",
      email: "bambang@gmail.com",
      password: "123",
      role: "guru",
    });
    await createTestPelajaran("IPA");

    const kelas = await getTestKelas("A");
    const sinmay = await getTestUser({
      email: "sinmay@gmail.com",
      role: "guru",
    });
    const rudi = await getTestUser({ email: "rudi@gmail.com", role: "guru" });
    const bambang = await getTestUser({
      email: "bambang@gmail.com",
      role: "guru",
    });
    const idGuru = {
      1: sinmay.id,
      2: rudi.id,
      3: bambang.id,
    };

    const pelajaran = await getTestPelajaran("IPA");

    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 6; j++) {
        await createTestJadwal({
          id_pelajaran: pelajaran.id,
          id_guru: parseInt(idGuru[i]),
          id_kelas: kelas.id,
          hari: j,
          mulai: { jam: 8, menit: 0 },
          berakhir: { jam: 9, menit: 0 },
        });
      }
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/jadwal/guru/username")
      .set("Cookie", `token=${cookie.token}`)
      .query({ username: "bambang" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });

  it("should reject jadwal not found", async () => {
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
      .get("/api/v1/jadwal/guru/username")
      .set("Cookie", `token=${cookie.token}`)
      .query({ username: "bambangs" });

    expect(result.status).toBe(404);
  });
});

describe("GET /api/v1/jadwal/kelas", () => {
  afterEach(async () => {
    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can get jadwal per kelas", async () => {
    await createUser({
      username: "alfri",
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
    });

    await createTestRuangKelas({ nomor_ruangan: 1, kapasitas: 30 });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "A" });
    await createTestKelas({ nomor_ruang_kelas: 1, kelas: "B" });
    await createUser({
      username: "sinmay",
      email: "sinmay@gmail.com",
      password: "123",
      role: "guru",
    });

    await createTestPelajaran("IPA");

    const kelasA = await getTestKelas("A");
    const kelasB = await getTestKelas("B");
    const sinmay = await getTestUser({
      email: "sinmay@gmail.com",
      role: "guru",
    });
    const idKelas = {
      1: kelasA.id,
      2: kelasB.id,
    };

    const pelajaran = await getTestPelajaran("IPA");

    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= 6; j++) {
        await createTestJadwal({
          id_pelajaran: pelajaran.id,
          id_guru: parseInt(sinmay.id),
          id_kelas: parseInt(idKelas[i]),
          hari: j,
          mulai: { jam: 8, menit: 0 },
          berakhir: { jam: 9, menit: 0 },
        });
      }
    }

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "admin@gmail.com", password: "123", role: "admin" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .get("/api/v1/jadwal/kelas/kelasName")
      .set("Cookie", `token=${cookie.token}`)
      .query({ kelas: "B" });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });

  it("should reject jadwal not found", async () => {
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
      .get("/api/v1/jadwal/kelas/username")
      .set("Cookie", `token=${cookie.token}`)
      .query({ username: "bambangs" });

    expect(result.status).toBe(404);
  });
});
