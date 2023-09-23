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

export const getTestUser = async () => {
  return prismaClient.admin.findFirst({
    where: {
      email: "admin@gmail.com",
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

export const removeUser = async (user) => {
  return prismaClient.$executeRaw`delete from admin`;
};

export const cookies = (cookies) => {
  const cookie = cookies.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value.split(";")[0];
    return acc;
  }, {});
  return cookie;
};

// export const getTestUser = async (email) => {
//   return prismaClient.user.findFirst({
//     where: {
//       email: email,
//     },
//   });
// };

// createAdmin();
// removeUser();
