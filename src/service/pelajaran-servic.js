import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import {
  createSchema,
  idSchema,
  pageSchema,
  pelajaranSchema,
  perPageSchema,
} from "../validation/pelajaran-validation.js";

const create = async (request) => {
  request = validate(createSchema, request);

  const countPelajaran = await prismaClient.pelajaran.count({
    where: {
      pelajaran: request.pelajaran,
    },
  });
  if (countPelajaran >= 1) {
    throw new ResponseError(401, ["data telah ada"]);
  }

  return prismaClient.pelajaran.create({
    data: request,
  });
};

const update = async (id, request) => {
  id = validate(idSchema, id);

  const pelajaran = await prismaClient.pelajaran.findFirst({
    where: {
      id: id,
    },
  });

  if (!pelajaran) {
    throw new ResponseError(404, ["data pelajaran tidak ditemukan"]);
  }

  request = validate(createSchema, request);

  // handle data yang unique
  // 1. if unique field not change
  if (pelajaran.pelajaran === request.pelajaran) {
    return prismaClient.pelajaran.update({
      where: {
        id: id,
      },
      data: request,
    });
  }

  // 2 if unique field change
  const pelajaranName = await prismaClient.pelajaran.count({
    where: {
      pelajaran: request.pelajaran,
    },
  });

  if (pelajaranName === 1) {
    throw new ResponseError(409, ["pelajaran telah ada"]);
  }

  return await prismaClient.pelajaran.update({
    where: {
      id: id,
    },
    data: request,
  });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const countPelajaran = await prismaClient.pelajaran.count({
    where: {
      id: id,
    },
  });

  if (!countPelajaran) {
    throw new ResponseError(404, ["pelajaran tidak ditemukan"]);
  }

  return prismaClient.pelajaran.delete({
    where: {
      id: id,
    },
  });
};

const getById = async (id) => {
  id = validate(idSchema, id);

  const data = await prismaClient.pelajaran.findFirst({
    where: {
      id: id,
    },
  });

  if (!data) {
    throw new ResponseError(404, ["data pelajaran tidak ditemukan"]);
  }

  return data;
};

const get = async ({ page, perPage }) => {
  page = validate(pageSchema, page);
  perPage = validate(perPageSchema, perPage);

  const query = {
    take: perPage,
    skip: (page - 1) * perPage,
    select: {
      id: true,
      pelajaran: true,
    },
  };

  const data = await prismaClient.pelajaran.findMany(query);

  const totalData = await prismaClient.pelajaran.count();

  return {
    data: [...data],
    page: {
      perPage: perPage,
      total: totalData,
      totalPage: Math.ceil(totalData / perPage),
      current: page,
    },
  };
};

const getByName = async (pelajaran) => {
  pelajaran = validate(pelajaranSchema, pelajaran);

  const result = await prismaClient.pelajaran.findMany({
    where: {
      pelajaran: {
        contains: pelajaran,
      },
    },
  });
  return result;
};

export default { create, update, remove, getById, get, getByName };
