import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import {
  createAdminSchema,
  idSchemas,
} from "../validation/admin-validation.js";
import { prismaClient } from "../app/database.js";
import {
  createRuangKelasSchema,
  idSchema,
  sortSchema,
} from "../validation/ruang-kelas-validation.js";

const create = async (request) => {
  request = validate(createRuangKelasSchema, request);

  const countRuang = await prismaClient.ruang_kelas.count({
    where: {
      nomor_ruangan: request.nomor_ruangan,
    },
  });

  if (countRuang >= 1) {
    throw new ResponseError(401, ["nomor ruangan telah ada"]);
  }

  return prismaClient.ruang_kelas.create({
    data: { ...request },
  });
};

const update = async (id, request) => {
  id = validate(idSchema, id);

  const ruangKelas = await prismaClient.ruang_kelas.findFirst({
    where: {
      id_ruang_kelas: id,
    },
  });

  if (!ruangKelas) {
    throw new ResponseError(404, ["data ruang kelas tidak ditemukan"]);
  }

  request = validate(createRuangKelasSchema, request);

  // handle data yang unique
  // 1. if unique field not change
  if (ruangKelas.nomor_ruangan === request.nomor_ruangan) {
    return prismaClient.ruang_kelas.update({
      where: {
        id_ruang_kelas: id,
      },
      data: request,
    });
  }

  // 2 if unique field change
  const nomorRuangan = await prismaClient.ruang_kelas.count({
    where: {
      nomor_ruangan: request.nomor_ruangan,
    },
  });

  if (nomorRuangan === 1) {
    throw new ResponseError(409, ["nomor ruangan telah ada"]);
  }

  return await prismaClient.ruang_kelas.update({
    where: {
      id_ruang_kelas: id,
    },
    data: request,
  });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const countRuangKelas = await prismaClient.ruang_kelas.count({
    where: {
      id_ruang_kelas: id,
    },
  });

  if (!countRuangKelas) {
    throw new ResponseError(404, ["data ruang kelas tidak ditemukan"]);
  }

  return prismaClient.ruang_kelas.delete({
    where: {
      id_ruang_kelas: id,
    },
  });
};

const getById = async (id) => {
  id = validate(idSchema, id);

  const data = await prismaClient.ruang_kelas.findFirst({
    where: {
      id_ruang_kelas: id,
    },
  });
  if (!data) {
    throw new ResponseError(404, ["data ruang kelas tidak ditemukan"]);
  }

  return data;
};

const get = async ({ page, perPage, sort, kapasitas }) => {
  page = validate(idSchema, page);
  perPage = validate(idSchema, perPage);
  sort = validate(sortSchema, sort);

  const query = {
    take: perPage,
    skip: (page - 1) * perPage,
    orderBy: {
      nomor_ruangan: sort,
    },
  };

  if (kapasitas) {
    // https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
    kapasitas = validate(idSchema, kapasitas);
    query.where = {
      kapasitas: kapasitas,
    };
  }

  const data = await prismaClient.ruang_kelas.findMany(query);

  // use same where
  const totalData = await prismaClient.ruang_kelas.count({
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
