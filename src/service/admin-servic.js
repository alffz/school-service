import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { createAdminSchema, idSchema } from "../validation/admin-validation.js";
import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";

const create = async (request) => {
  request = validate(createAdminSchema, request);

  const countUser = await prismaClient.admin.count({
    where: {
      email: request.email,
    },
  });

  if (countUser >= 1) {
    throw new ResponseError(401, ["Admin telah ada"]);
  }

  const password = await bcrypt.hash(request.password, 10);

  const user = {
    username: request.username,
    email: request.email,
    password: password,
  };

  return prismaClient.admin.create({ data: user, select: { username: true } });
};

const update = async (id, request) => {
  id = validate(idSchema, id);

  const admin = await prismaClient.admin.findFirst({
    where: {
      id: id,
    },
  });

  if (!admin) {
    throw new ResponseError(404, ["data Admin tidak ditemukan"]);
  }

  request = validate(createAdminSchema, request);

  // handle data yang unique (email)
  // 1. jika emailnya gak berubah maka data itu pasti miliknya sendir, so langsung update
  if (admin.email === request.email) {
    return prismaClient.admin.update({
      where: {
        id: id,
      },
      data: request,
    });
  }

  // 2 kalau emailnya berubah cek apakah email tersebut udah dipake
  const email = await prismaClient.admin.count({
    where: {
      email: request.email,
    },
  });

  if (email === 1) {
    throw new ResponseError(409, ["email telah digunakan"]);
  }

  return await prismaClient.admin.update({
    where: {
      id: id,
    },
    data: request,
  });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const admin = await prismaClient.admin.findFirst({
    where: {
      id: id,
    },
  });

  if (!admin) {
    throw new ResponseError(404, ["data Admin tidak ditemukan"]);
  }

  return prismaClient.admin.delete({
    where: {
      id: id,
    },
  });
};

const get = async ({ page, perPage }) => {
  page = validate(idSchema, page);
  perPage = validate(idSchema, perPage);

  const skip = (page - 1) * perPage; // 1-1 * 20 = 0 , 2-1 * 20 = 20, 3-1 * 20 = 40
  // limit jumlah data yang mau di ambil / take
  // offset index data ke / skip
  const data = await prismaClient.admin.findMany({
    take: perPage,
    skip: skip,
  });
  const totalData = await prismaClient.admin.count();
  return {
    data,
    page: {
      size: perPage,
      total: totalData,
      totalPage: Math.ceil(totalData / perPage),
      current: page,
    },
  };
};

export default { create, update, remove, get };
