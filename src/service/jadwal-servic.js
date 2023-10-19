import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import {
  createSchema,
  idSchema,
  hariSchema,
  userNameSchema,
  kelasSchema,
  pageSchema,
  perPageSchema,
} from "../validation/jadwal-validation.js";
import { days, daysByNumber } from "../utils/days.js";

const create = async (request) => {
  request = validate(createSchema, request);
  const result = await prismaClient.jadwal.create({
    data: request,
  });
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

  const result = await prismaClient.jadwal.update({
    where: {
      id: id,
    },
    data: request,
  });
  return result;
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
    },
  });

  if (!data) {
    throw new ResponseError(404, ["data jadwal tidak ditemukan"]);
  }
  return {
    id: data?.id,
    pelajaran: data.pelajaran?.pelajaran,
    guru: data.guru?.guru,
    kelas: data.kelas?.kelas,
    hari: data?.hari,
    mulai: data?.mulai,
    berakhir: data?.berakhir,
    status: data?.status,
  };
};

const get = async ({ page, perPage, hari }) => {
  page = validate(pageSchema, page);
  perPage = validate(perPageSchema, perPage);
  hari = validate(hariSchema, hari);
  hari = days[hari];

  const data = await prismaClient.jadwal.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
    where: {
      hari: hari,
    },
    select: {
      id: true,
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
      pelajaran: {
        select: {
          pelajaran: true,
        },
      },
      mulai: true,
      berakhir: true,
      status: true,
    },
    orderBy: {
      guru: {
        username: "asc",
      },
    },
  });

  if (data.length <= 0) {
    throw new ResponseError(404, ["data jadwal tidak ditemukan"]);
  }

  const totalData = await prismaClient.jadwal.count({
    where: {
      hari: hari,
    },
  });
  const result = data.map((item) => {
    return {
      id: item.id,
      guru: item.guru.username,
      kelas: item.kelas.kelas,
      pelajaran: item.pelajaran.pelajaran,
      mulai: item.mulai,
      berakhir: item.berakhir,
      statur: item.status,
    };
  });

  return {
    data: result,
    page: {
      perPage: perPage,
      total: totalData,
      totalPage: Math.ceil(totalData / perPage),
      current: page,
    },
  };
};

const getByGuru = async (username) => {
  username = validate(userNameSchema, username);

  const data = await prismaClient.jadwal.findMany({
    where: {
      guru: {
        username: username,
      },
    },
    select: {
      id: true,
      kelas: {
        select: {
          kelas: true,
        },
      },
      pelajaran: {
        select: {
          pelajaran: true,
        },
      },
      hari: true,
      mulai: true,
      berakhir: true,
      status: true,
    },
    orderBy: {
      guru: {
        username: "asc",
      },
    },
  });

  if (data.length <= 0) {
    throw new ResponseError(404, ["data jadwal tidak ditemukan"]);
  }
  // const username = data[0];
  const result = data.reduce((acc, curr) => {
    const byHari = data
      .filter(({ hari }) => hari === curr.hari)
      .map((item) => {
        return {
          id: item.id,
          kelas: item.kelas.kelas,
          pelajaran: item.pelajaran.pelajaran,
          hari: item.hari,
          mulai: item.mulai,
          berakhir: item.berakhir,
          status: item.status,
        };
      });
    const hari = curr.hari;
    acc[daysByNumber[hari]] = byHari;
    return acc;
  }, {});
  return {
    guru: username,
    data: result,
  };
};

const getByKelas = async (kelas) => {
  kelas = validate(kelasSchema, kelas);

  const data = await prismaClient.jadwal.findMany({
    where: {
      kelas: {
        kelas: kelas,
      },
    },
    select: {
      id: true,
      guru: {
        select: {
          username: true,
        },
      },
      pelajaran: {
        select: {
          pelajaran: true,
        },
      },
      hari: true,
      mulai: true,
      berakhir: true,
    },
    orderBy: {
      hari: "asc",
    },
  });

  if (data.length <= 0) {
    throw new ResponseError(404, ["data jadwal tidak ditemukan"]);
  }

  const result = data.reduce((acc, curr) => {
    const byHari = data
      .filter(({ hari }) => hari === curr.hari)
      .map((item) => {
        return {
          id: item.id,
          guru: item.guru.username,
          pelajaran: item.pelajaran.pelajaran,
          hari: item.hari,
          mulai: item.mulai,
          berakhir: item.berakhir,
        };
      });
    const hari = curr.hari;
    acc[daysByNumber[hari]] = byHari;
    return acc;
  }, {});
  return {
    data: {
      kelas: kelas,
      hari: result,
    },
  };
};

export default { create, update, remove, getById, get, getByGuru, getByKelas };
