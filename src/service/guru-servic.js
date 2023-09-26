import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import {
  createGuruSchema,
  idSchema,
  pageSchema,
  perPageSchema,
  sortSchema,
  userNameSchema,
} from "../validation/guru-validation.js";

const create = async (request) => {
  request = validate(createGuruSchema, request);

  const countUser = await prismaClient.guru.count({
    where: {
      email: request.email,
    },
  });

  if (countUser >= 1) {
    throw new ResponseError(401, ["data Guru telah ada"]);
  }

  const password = await bcrypt.hash(request.password, 10);

  const user = {
    username: request.username,
    email: request.email,
    password: password,
  };

  return prismaClient.guru.create({ data: user });
};

const update = async ({ id, request }) => {
  id = validate(idSchema, id);

  const guru = await prismaClient.guru.findFirst({
    where: {
      id: id,
    },
  });

  if (!guru) {
    throw new ResponseError(404, ["data guru tidak ditemukan"]);
  }

  request = validate(createGuruSchema, request);

  // handle data yang unique (email)
  // 1. jika emailnya gak berubah maka data itu pasti miliknya sendir, so langsung update
  if (guru.email === request.email) {
    return prismaClient.guru.update({
      where: {
        id: id,
      },
      data: request,
    });
  }

  // 2 kalau emailnya berubah cek apakah email tersebut udah dipake
  const email = await prismaClient.guru.count({
    where: {
      email: request.email,
    },
  });

  if (email === 1) {
    throw new ResponseError(409, ["email telah digunakan"]);
  }

  return await prismaClient.guru.update({
    where: {
      id: id,
    },
    data: request,
  });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const guru = await prismaClient.guru.findFirst({
    where: {
      id: id,
    },
  });

  if (!guru) {
    throw new ResponseError(404, ["data guru tidak ditemukan"]);
  }

  return prismaClient.guru.delete({
    where: {
      id: id,
    },
  });
};

const getById = async ({ id }) => {
  id = validate(idSchema, id);

  const data = await prismaClient.guru.findFirst({
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
    throw new ResponseError(404, ["data guru tidak ditemukan"]);
  }

  return data;
};

const get = async ({ page, perPage, sort, username }) => {
  page = validate(pageSchema, page);
  perPage = validate(perPageSchema, perPage);
  sort = validate(sortSchema, sort);
  console.log(typeof page, typeof perPage);
  console.log(page, perPage);

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
    console.log(username);
    query.where = {
      username: username,
    };
  }

  const data = await prismaClient.guru.findMany(query);
  data.map((data) => {
    const temp = (data.kelas = data.kelas?.kelas);
    return temp;
  });

  // use same where
  const totalData = await prismaClient.guru.count({
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
