import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import {
  createRuangKelasSchema,
  idSchemas,
  sortSchemas,
} from "../validation/ruang-kelas-validation.js";
import {
  createKelasSchema,
  idSchema,
  kelasSchema,
  sortSchema,
} from "../validation/kelas-validation.js";

const create = async (request) => {
  request = validate(createKelasSchema, request);

  const countKelas = await prismaClient.kelas.count({
    where: {
      kelas: request.kelas,
    },
  });
  if (countKelas >= 1) {
    throw new ResponseError(401, ["kelas telah ada"]);
  }

  return prismaClient.kelas.create({
    data: request,
  });
};

const update = async (id, request) => {
  id = validate(idSchema, id);

  const kelas = await prismaClient.kelas.findFirst({
    where: {
      id_kelas: id,
    },
  });

  if (!kelas) {
    throw new ResponseError(404, ["data kelas tidak ditemukan"]);
  }

  request = validate(createKelasSchema, request);

  // handle data yang unique
  // 1. if unique field not change
  if (kelas.kelas === request.kelas) {
    return prismaClient.kelas.update({
      where: {
        id_kelas: id,
      },
      data: request,
    });
  }

  // 2 if unique field change
  const nomorRuangKelas = await prismaClient.kelas.count({
    where: {
      kelas: request.kelas,
    },
  });

  if (nomorRuangKelas === 1) {
    throw new ResponseError(409, ["kelas telah ada"]);
  }

  return await prismaClient.kelas.update({
    where: {
      id_kelas: id,
    },
    data: request,
  });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const countKelas = await prismaClient.kelas.count({
    where: {
      id_kelas: id,
    },
  });

  if (!countKelas) {
    throw new ResponseError(404, ["kelas tidak ditemukan"]);
  }

  return prismaClient.kelas.delete({
    where: {
      id_kelas: id,
    },
  });
};

const getById = async (id) => {
  id = validate(idSchema, id);

  const data = await prismaClient.kelas.findFirst({
    where: {
      id_kelas: id,
    },
  });
  if (!data) {
    throw new ResponseError(404, ["data kelas tidak ditemukan"]);
  }

  return data;
};

const get = async ({ page, perPage, kelas }) => {
  page = validate(idSchema, page);
  perPage = validate(idSchema, perPage);
  console.log(typeof page, typeof perPage);
  console.log(page, perPage);

  const query = {
    take: perPage,
    skip: (page - 1) * perPage,
  };

  if (kelas) {
    // https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
    kelas = validate(kelasSchema, kelas);
    console.log(kelas);
    query.where = {
      kelas: kelas,
    };
  }

  const data = await prismaClient.kelas.findMany(query);

  // use same where
  const totalData = await prismaClient.kelas.count({
    where: query.where,
  });

  return {
    data,
    page: {
      perPage: perPage,
      total: totalData,
      totalPage: Math.ceil(totalData / perPage),
      current: page,
    },
  };
};

export default { create, update, remove, getById, get };
