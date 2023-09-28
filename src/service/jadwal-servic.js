import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import {
  createSchema,
  idSchema,
  hariSchema,
  userNameSchema,
  statusSchema,
  pageSchema,
  perPageSchema,
} from "../validation/jadwal-validation.js";

const create = async (request) => {
  request = validate(createSchema, request);
  // console.log(request);
  const schedule = await prismaClient.$queryRaw`SELECT *
    FROM jadwal
      WHERE 
        id_kelas = ${request.id_kelas}
        AND id_guru = ${request.id_guru}
        AND hari = ${request.hari}
        AND ((
          CAST(JSON_EXTRACT(mulai, '$.jam') AS UNSIGNED) * 60 +
          CAST(JSON_EXTRACT(mulai, '$.menit') AS UNSIGNED)
        ) BETWEEN ${request.mulai.jam} * 60 + ${request.mulai.menit} AND ${request.berakhir.jam} * 60 + ${request.berakhir.menit}
        OR (
          CAST(JSON_EXTRACT(berakhir, '$.jam') AS UNSIGNED) * 60 +
          CAST(JSON_EXTRACT(berakhir, '$.menit') AS UNSIGNED)
        ) BETWEEN ${request.mulai.jam} * 60 + ${request.mulai.menit} AND ${request.berakhir.jam} * 60 + ${request.berakhir.menit})`;
  console.log(schedule.length);
  if (schedule.length > 0) {
    throw new ResponseError(409, ["jadwal bentrok"]);
  }

  const result = await prismaClient.jadwal.create({
    data: request,
  });
  // console.log(result);
  return result;
};

const update = async ({ id, request }) => {
  id = validate(idSchema, id);

  const jadwal = await prismaClient.jadwal.findFirst({
    where: {
      id: id,
    },
  });

  if (!jadwal) {
    throw new ResponseError(404, ["data jadwal tidak ditemukan"]);
  }

  request = validate(createSchema, request);

  // 1. jika ada data yang berubah , cek lagi ke db apakah datanya gak bentrok
  if (
    jadwal.id_pelajaran !== request.id_pelajaran ||
    jadwal.id_guru !== request.id_guru ||
    jadwal.id_kelas !== request.id_kelas ||
    jadwal.hari !== request.hari ||
    JSON.stringify(jadwal.mulai) !== SON.stringify(request.mulai) ||
    JSON.stringify(jadwal.berakhir) !== SON.stringify(request.berakhir)
  ) {
    const jadwaldata = await prismaClient.$executeRaw`SELECT *
    FROM jadwal
    WHERE id_guru = ${jadwal.id_guru}
      AND id_kelas = ${jadwal.id_kelas}
      AND hari = ${jadwal.hari}
      AND (
        (
          CAST(JSON_EXTRACT(mulai, '$.jam') AS UNSIGNED) > ${jadwal.berakhir.jam}
          OR (
            CAST(JSON_EXTRACT(mulai, '$.jam') AS UNSIGNED) = ${jadwal.berakhir.jam}
            AND CAST(JSON_EXTRACT(mulai, '$.menit') AS UNSIGNED) > ${jadwal.berakhir.menit}
          )
        )
        OR (
          CAST(JSON_EXTRACT(mulai, '$.jam') AS UNSIGNED) < ${jadwal.mulai.jam}
          OR (
            CAST(JSON_EXTRACT(mulai, '$.jam') AS UNSIGNED) = ${jadwal.mulai.jam}
            AND CAST(JSON_EXTRACT(mulai, '$.menit') AS UNSIGNED) < ${jadwal.mulai.menit}
          )
        )
    );
    `;

    if (jadwaldata) {
      throw new ResponseError(409, ["jadwal bentrok"]);
    } else {
      return await prismaClient.jadwal.update({
        where: {
          id: id,
        },
        data: request,
      });
    }
  }

  // // 2 kalau emailnya berubah cek apakah email tersebut udah dipake
  // const email = await prismaClient.jadwal.count({
  //   where: {
  //     email: request.email,
  //   },
  // });

  // if (email === 1) {
  //   throw new ResponseError(409, ["email telah digunakan"]);
  // }

  // return await prismaClient.jadwal.update({
  //   where: {
  //     id: id,
  //   },
  //   data: request,
  // });
};

const remove = async (id) => {
  id = validate(idSchema, id);

  const jadwal = await prismaClient.jadwal.findFirst({
    where: {
      id: id,
    },
  });

  if (!jadwal) {
    throw new ResponseError(404, ["data jadwal tidak ditemukan"]);
  }

  return prismaClient.jadwal.delete({
    where: {
      id: id,
    },
  });
};

const getById = async ({ id }) => {
  id = validate(idSchema, id);

  const data = await prismaClient.jadwal.findFirst({
    where: {
      id: id,
    },
    select: {
      pelajaran: {
        select: {
          pelajaran: true,
        },
      },
      guru: {
        select: {
          username: true,
        },
      },
      kelas: {
        select: {
          kelas: true,
        },
      },
      hari: true,
      mulai: true,
      berakhir: true,
      status: true,
    },
  });

  if (!data) {
    throw new ResponseError(404, ["data jadwal tidak ditemukan"]);
  }

  return data;
};

const get = async ({ page, perPage, username }) => {
  page = validate(pageSchema, page);
  perPage = validate(perPageSchema, perPage);

  const select = {
    id: true,
    pelajaran: {
      select: {
        pelajaran: true,
      },
    },
    guru: {
      select: {
        username: true,
      },
    },
    kelas: {
      select: {
        kelas: true,
      },
    },
    hari: true,
    mulai: true,
    berakhir: true,
    status: true,
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
      username: username,
    };
  }

  const data = await prismaClient.jadwal.findMany(query);

  // data.map((data) => {
  //   const kelas = (data.kelas = data.kelas?.kelas);
  //   return kelas;
  // });

  // use same where
  const totalData = await prismaClient.jadwal.count({
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
const createJadwal = async () => {
  const result = await prismaClient.$queryRaw`select * from jadwal`;
  console.log(result);
  // return;
};

// create();
