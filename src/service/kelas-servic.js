import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import {
  createKelasSchema,
  idSchema,
  kelasSchema,
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
      id: id,
    },
  });

  if (!kelas) {
    throw new ResponseError(404, ["data kelas tidak ditemukan"]);
  }

  request = validate(createKelasSchema, request);

  const ruangKelas = await prismaClient.ruang_kelas.findFirst({
    where: {
      nomor_ruangan: request.nomor_ruang_kelas,
    },
  });

  if (!ruangKelas) {
    throw new ResponseError(404, ["data ruang kelas tidak ditemukan"]);
  }

  // handle data yang unique
  // 1. if unique field not change
  if (kelas.kelas === request.kelas) {
    return prismaClient.kelas.update({
      where: {
        id: id,
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
      id: id,
    },
    data: request,
  });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const countKelas = await prismaClient.kelas.count({
    where: {
      id: id,
    },
  });

  if (!countKelas) {
    throw new ResponseError(404, ["kelas tidak ditemukan"]);
  }

  return prismaClient.kelas.delete({
    where: {
      id: id,
    },
  });
};

const getById = async (id) => {
  id = validate(idSchema, id);

  const data = await prismaClient.kelas.findFirst({
    where: {
      id: id,
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

const getMuridAtClass = async ({ id_kelas }) => {
  id_kelas = validate(idSchema, id_kelas);

  const kelas = await prismaClient.kelas.findFirst({
    where: {
      id: id_kelas,
    },
  });

  if (!kelas) {
    throw new ResponseError(404, ["kelas tidak ditemukan"]);
  }

  const data = await prismaClient.murid.findMany({
    where: {
      id_kelas: id_kelas,
    },
    select: {
      id: true,
      username: true,
    },
  });

  if (data.length === 0) {
    throw new ResponseError(404, ["Murid tidak ditemukan"]);
  }

  return {
    kelas: kelas.kelas,
    murid: data,
  };
};

export default { create, update, remove, getById, get, getMuridAtClass };
