import supertest from "supertest";
import web from "../src/app/web.js";
import {
  createUser,
  cookies,
  getTestUser,
  createTestKelas,
  createTestRuangKelas,
  getTestKelas,
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
  getManyTestMurid,
  deleteAllMurid,
  deleteAllKehadiranMurid,
  deleteAllKehadiranGuru,
  setStatusJadwalToTrue,
} from "./test-utils.js";

describe("POST /api/v1/kehadiran", () => {
  afterEach(async () => {
    await deleteAllKehadiranGuru();
    await deleteAllKehadiranMurid();
    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllMurid();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can create kehadiran murid dan guru", async () => {
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
    const jam = new Date();
    await createTestJadwal({
      id_pelajaran: pelajaran.id,
      id_guru: id,
      id_kelas: kelas.id,
      hari: 1,
      mulai: { jam: jam.getHours(), menit: jam.getMinutes() },
      berakhir: { jam: 9, menit: 0 },
    });

    const jadwal = await getTestJadawl();

    for (let i = 1; i < 20; i++) {
      await createTestMurid({
        username: `murid ${i}`,
        email: `email${i}`,
        password: "123",
        id_kelas: kelas.id,
      });
    }
    const getTestMurids = await getManyTestMurid();
    const murid = getTestMurids.map((murid) => {
      return { ...murid, keterangan: "hadir" };
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/kehadiran")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_jadwal: jadwal.id,
        id_guru: id,
        murid: murid,
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });

  it("should reject status jadwal is true ", async () => {
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
    const jam = new Date();
    await createTestJadwal({
      id_pelajaran: pelajaran.id,
      id_guru: id,
      id_kelas: kelas.id,
      hari: 1,
      mulai: { jam: jam.getHours(), menit: jam.getMinutes() },
      berakhir: { jam: 9, menit: 0 },
    });

    const jadwal = await getTestJadawl();

    await setStatusJadwalToTrue(jadwal.id);

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/kehadiran")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_jadwal: jadwal.id,
        id_guru: id,
        murid: [{ id: 1, keterangan: "hadir" }],
      });

    expect(result.status).toBe(403);
  });

  it("shoulde reject jadwal not found", async () => {
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const jam = new Date();
    const result = await supertest(web)
      .post("/api/v1/kehadiran")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_jadwal: 1,
        id_guru: 1,
        murid: [{ id: 1, keterangan: "hadir" }],
      });

    expect(result.status).toBe(404);
  });

  it("shoulde reject guru not found", async () => {
    await createUser({
      username: "guru",
      email: "guru@gmail.com",
      password: "123",
      role: "guru",
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const jam = new Date();
    const result = await supertest(web)
      .post("/api/v1/kehadiran")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_jadwal: 1,
        id_guru: 1,
        murid: [{ id: 1, keterangan: "hadir" }],
      });

    expect(result.status).toBe(404);
  });

  it("should reject portal telah ditutup", async () => {
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
    const jam = new Date();
    await createTestJadwal({
      id_pelajaran: pelajaran.id,
      id_guru: id,
      id_kelas: kelas.id,
      hari: 1,
      mulai: { jam: jam.getHours() - 1, menit: jam.getMinutes() },
      berakhir: { jam: 9, menit: 0 },
    });

    const jadwal = await getTestJadawl();

    for (let i = 1; i < 20; i++) {
      await createTestMurid({
        username: `murid ${i}`,
        email: `email${i}`,
        password: "123",
        id_kelas: kelas.id,
      });
    }
    const getTestMurids = await getManyTestMurid();
    const murid = getTestMurids.map((murid) => {
      return { ...murid, keterangan: "hadir" };
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/kehadiran")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_jadwal: jadwal.id,
        id_guru: id,
        murid: murid,
      });

    expect(result.status).toBe(400);
  });
  it("should reject portal belum dibuka", async () => {
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
    const jam = new Date();
    await createTestJadwal({
      id_pelajaran: pelajaran.id,
      id_guru: id,
      id_kelas: kelas.id,
      hari: 1,
      mulai: { jam: jam.getHours() + 1, menit: jam.getMinutes() },
      berakhir: { jam: 9, menit: 0 },
    });

    const jadwal = await getTestJadawl();

    for (let i = 1; i < 20; i++) {
      await createTestMurid({
        username: `murid ${i}`,
        email: `email${i}`,
        password: "123",
        id_kelas: kelas.id,
      });
    }
    const getTestMurids = await getManyTestMurid();
    const murid = getTestMurids.map((murid) => {
      return { ...murid, keterangan: "hadir" };
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const result = await supertest(web)
      .post("/api/v1/kehadiran")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_jadwal: jadwal.id,
        id_guru: id,
        murid: murid,
      });

    expect(result.status).toBe(400);
  });
});

describe("POST /api/v1/kehadiran/murid", () => {
  afterEach(async () => {
    await deleteAllKehadiranGuru();
    await deleteAllKehadiranMurid();
    await deleteAllJadwal();
    await deleteTestPelajaran();
    await deleteAllKelas();
    await deleteAllRuangKelas();
    await deleteAllMurid();
    await deleteAllAdmin();
    await deleteAllGuru();
  });
  it("should can get kehadiran murid", async () => {
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
    const jam = new Date();
    await createTestJadwal({
      id_pelajaran: pelajaran.id,
      id_guru: id,
      id_kelas: kelas.id,
      hari: 1,
      mulai: { jam: jam.getHours(), menit: jam.getMinutes() },
      berakhir: { jam: 9, menit: 0 },
    });

    const jadwal = await getTestJadawl();

    for (let i = 1; i < 20; i++) {
      await createTestMurid({
        username: `murid ${i}`,
        email: `email${i}`,
        password: "123",
        id_kelas: kelas.id,
      });
    }
    const getTestMurids = await getManyTestMurid();
    const murid = getTestMurids.map((murid) => {
      return { ...murid, keterangan: "hadir" };
    });

    const login = await supertest(web)
      .post("/api/v1/user/login")
      .send({ email: "guru@gmail.com", password: "123", role: "guru" });

    const cookie = cookies(login.header["set-cookie"]);

    const j = await supertest(web)
      .post("/api/v1/kehadiran")
      .set("Cookie", `token=${cookie.token}`)
      .send({
        id_jadwal: jadwal.id,
        id_guru: id,
        murid: murid,
      });
    console.log(j.body);
    const result = await supertest(web)
      .get("/api/v1/kehadiran/murid/apa")
      .set("Cookie", `token=${cookie.token}`)
      .query({
        id_jadwal: jadwal.id,
        tanggal: `${jam.toISOString().slice(0, 10)}`,
      });
    console.log(result.text);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("SUCCESS");
  });
});
