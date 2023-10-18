import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import {
  createSchema,
  idSchema,
  pageSchema,
  perPageSchema,
  userNameSchema,
} from "../validation/murid-validation.js";

const create = async (request) => {
  request = validate(createSchema, request);

  const countUser = await prismaClient.murid.count({
    where: {
      email: request.email,
    },
  });

  if (countUser >= 1) {
    throw new ResponseError(401, ["data murid telah ada"]);
  }

  const password = await bcrypt.hash(request.password, 10);

  const user = {
    username: request.username,
    email: request.email,
    password: password,
    id_kelas: request?.id_kelas,
  };

  return prismaClient.murid.create({ data: user, select: { username: true } });
};

const update = async ({ id, request }) => {
  id = validate(idSchema, id);

  const murid = await prismaClient.murid.findFirst({
    where: {
      id: id,
    },
  });

  if (!murid) {
    throw new ResponseError(404, ["data murid tidak ditemukan"]);
  }

  request = validate(createSchema, request);

  // handle data yang unique (email)
  // 1. jika emailnya gak berubah maka data itu pasti miliknya sendir, so langsung update
  if (murid.email === request.email) {
    return prismaClient.murid.update({
      where: {
        id: id,
      },
      data: request,
      select: {
        username: true,
      },
    });
  }

  // 2 kalau emailnya berubah cek apakah email tersebut udah dipake
  const email = await prismaClient.murid.count({
    where: {
      email: request.email,
    },
  });

  if (email === 1) {
    throw new ResponseError(409, ["email telah digunakan"]);
  }

  return await prismaClient.murid.update({
    where: {
      id: id,
    },
    data: request,
  });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const murid = await prismaClient.murid.findFirst({
    where: {
      id: id,
    },
  });

  if (!murid) {
    throw new ResponseError(404, ["data murid tidak ditemukan"]);
  }

  return prismaClient.murid.delete({
    where: {
      id: id,
    },
  });
};

const getById = async ({ id }) => {
  id = validate(idSchema, id);

  const data = await prismaClient.murid.findFirst({
    where: {
      id: id,
    },
    select: {
      username: true,
      email: true,
      kelas: {
        select: {
          kelas: true,
        },
      },
    },
  });

  if (!data) {
    throw new ResponseError(404, ["data murid tidak ditemukan"]);
  }

  return {
    username: data.username,
    email: data.email,
    kelas: data.kelas.kelas,
  };
};

const get = async ({ page, perPage, username }) => {
  page = validate(pageSchema, page);
  perPage = validate(perPageSchema, perPage);

  const select = {
    id: true,
    username: true,
    email: true,
    kelas: {
      select: {
        kelas: true,
      },
    },
  };

  const query = {
    take: perPage,
    skip: (page - 1) * perPage,
    select,
  };

  if (username) {
    // https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
    username = validate(userNameSchema, username);

    query.where = {
      username: {
        contains: username,
      },
    };
  }

  const data = await prismaClient.murid.findMany(query);

  data.map((data) => {
    const kelas = (data.kelas = data.kelas?.kelas);
    return kelas;
  });

  // use same where
  const totalData = await prismaClient.murid.count({
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
