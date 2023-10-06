import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const createUser = async ({ username, email, password, role }) => {
  const user = {
    username: username,
    email: email,
    password: await bcrypt.hash(password, 10),
  };

  const roles = {
    admin: prismaClient.admin,
    guru: prismaClient.guru,
    murid: prismaClient.murid,
  };

  const userRole = roles[role];

  return userRole.create({
    data: user,
  });
};

export const createTestGuru = async ({
  username,
  email,
  password,
  id_kelas,
}) => {
  return prismaClient.guru.create({
    data: {
      username,
      email,
      password,
      id_kelas: id_kelas,
    },
  });
};

export const createTestMurid = async ({
  username,
  email,
  password,
  id_kelas,
}) => {
  return prismaClient.murid.create({
    data: {
      username,
      email,
      password,
      id_kelas: id_kelas,
    },
  });
};

export const deleteUser = async ({ email, role }) => {
  const roles = {
    admin: prismaClient.admin,
    guru: prismaClient.guru,
    murid: prismaClient.murid,
  };

  const userRole = roles[role];

  return userRole.delete({
    where: {
      email: email,
    },
  });
};

export const getTestUser = async ({ email, role }) => {
  const roles = {
    admin: prismaClient.admin,
    guru: prismaClient.guru,
    murid: prismaClient.murid,
  };

  const userRole = roles[role];

  return userRole.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
};

export const createTestRuangKelas = async ({
  nomor_ruangan,
  kapasitas,
  tersedia,
}) => {
  return prismaClient.ruang_kelas.create({
    data: {
      nomor_ruangan,
      kapasitas,
      tersedia,
    },
  });
};
export const deleteTestRuangKelas = async (nomor) => {
  return prismaClient.ruang_kelas.delete({
    where: {
      nomor_ruangan: nomor,
    },
  });
};

export const getTestRuangKelas = async () => {
  return prismaClient.ruang_kelas.findFirst({
    where: {
      nomor_ruangan: 1,
    },
  });
};

export const deleteAllTestKelas = async (nomor_ruangan) => {
  return prismaClient.$queryRaw`delete from kelas`;
};

export const createTestKelas = async ({ nomor_ruang_kelas, kelas }) => {
  return prismaClient.kelas.create({
    data: { nomor_ruang_kelas, kelas },
  });
};

export const getTestKelas = async (kelas) => {
  return prismaClient.kelas.findFirst({
    where: {
      kelas: kelas,
    },
  });
};
export const removeUser = async (user) => {
  return prismaClient.$executeRaw`delete from admin`;
};

export const createTestPelajaran = async (pelajaran) => {
  return await prismaClient.pelajaran.create({
    data: { pelajaran },
  });
};
export const deleteTestPelajaran = async () => {
  return await prismaClient.$executeRaw`delete from pelajaran`;
};

export const getTestPelajaran = async (pelajaran) => {
  return await prismaClient.pelajaran.findFirst({
    where: {
      pelajaran,
    },
  });
};

export const deleteAllJadwal = async () => {
  return await prismaClient.$executeRaw`delete from jadwal`;
};
export const deleteAllKelas = async () => {
  return await prismaClient.$executeRaw`delete from kelas`;
};
export const deleteAllRuangKelas = async () => {
  return await prismaClient.$executeRaw`delete from ruang_kelas`;
};
export const deleteAllGuru = async () => {
  return await prismaClient.$executeRaw`delete from guru`;
};
export const deleteAllMurid = async () => {
  return await prismaClient.$executeRaw`delete from murid`;
};
export const deleteAllAdmin = async () => {
  return await prismaClient.$executeRaw`delete from admin`;
};
export const deleteAllKehadiranMurid = async () => {
  return await prismaClient.$executeRaw`delete from kehadiran_murid`;
};
export const deleteAllKehadiranGuru = async () => {
  return await prismaClient.$executeRaw`delete from kehadiran_guru`;
};
export const cookies = (cookies) => {
  const cookie = cookies.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value.split(";")[0];
    return acc;
  }, {});
  return cookie;
};

export const getTestJadawl = async () => {
  return prismaClient.jadwal.findFirst();
};

export const createTestJadwal = async ({
  id_pelajaran,
  id_guru,
  id_kelas,
  hari,
  mulai,
  berakhir,
}) => {
  return prismaClient.jadwal.create({
    data: {
      id_pelajaran,
      id_guru,
      id_kelas,
      hari,
      mulai,
      berakhir,
    },
  });
};

export const getManyTestMurid = async () => {
  return await prismaClient.murid.findMany({
    select: {
      id: true,
    },
  });
};

export const setStatusJadwalToTrue = async (id) => {
  return await prismaClient.jadwal.update({
    where: {
      id: id,
    },
    data: {
      status: true,
    },
  });
};
