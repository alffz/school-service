import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import {
  createSchema,
  idSchema,
  tanggalSchema,
} from "../validation/kehadiran-murid-dan-guru-validation.js";
import { days, daysByNumber } from "../utils/days.js";

const create = async (request) => {
  // console.log(request);
  request = validate(createSchema, request);
  // console.log(request);
  // return;
  const jadwal = await prismaClient.jadwal.findFirst({
    where: {
      id: request.id_jadwal,
    },
  });
  // console.log(typeof jadwal.status);
  if (!jadwal) {
    throw new ResponseError(404, ["Jadwal tidak ditemukan"]);
  }

  // toggle pake cron
  if (jadwal.status) {
    throw new ResponseError(403, [
      "absensi tidak tersedia atau telah dilakukan",
    ]);
  }

  const jamMulai = jadwal.mulai.jam * 60 + jadwal.mulai.menit;
  const batasAbsensi = 10 + jamMulai;
  const jam = new Date();
  const jamAbsensi = jam.getHours() * 60 + jam.getMinutes();
  // console.log(jamAbsensi, batasAbsensi);
  // console.log(jamAbsensi, batasAbsensi);
  // return;

  if (jamAbsensi < jamMulai) {
    throw new ResponseError(400, ["Maaf portal belum dibuka"]);
  }

  if (jamAbsensi > batasAbsensi) {
    throw new ResponseError(400, ["Maaf portal telah ditutup"]);
  }

  const guru = await prismaClient.guru.findFirst({
    where: {
      id: request.id_guru,
    },
  });

  if (!guru) {
    throw new ResponseError(404, ["guru tidak ditemuakan"]);
  }

  await prismaClient.kehadiran_guru.create({
    data: {
      id_jadwal: request.id_jadwal,
      id_guru: request.id_guru,
      tanggal: request.tanggal,
    },
  });

  const muridsId = request.murid.map((murid) => murid.id);
  // console.log(muridsId);
  for (let i = 0; i < muridsId.length; i++) {
    const murid = await prismaClient.murid.count({
      where: {
        id: request.murid[i].id,
      },
    });
    // console.log(murid);
    if (murid > 0) {
      await prismaClient.kehadiran_murid.create({
        data: {
          id_jadwal: request.id_jadwal,
          tanggal: request.tanggal,
          id_murid: request.murid[i].id,
          keterangan: request.murid[i].keterangan,
        },
      });
    }
  }
  await prismaClient.jadwal.update({
    where: {
      id: jadwal.id,
    },
    data: {
      status: true,
    },
  });

  return;
};

const get = async ({ id, tanggal }) => {
  id = validate(idSchema, id);
  tanggal = validate(tanggalSchema, tanggal);

  const kehadiranMurid = await prismaClient.kehadiran_murid.findMany({
    where: {
      id_jadwal: id,
      tanggal: tanggal,
    },
    select: {
      jadwal: {
        select: {
          kelas: {
            select: {
              kelas: true,
            },
          },
        },
      },
      tanggal: true,
      murid: {
        select: {
          id: true,
          username: true,
        },
      },
      keterangan: true,
    },
  });

  if (kehadiranMurid.length === 0) {
    throw new ResponseError(404, ["data kehadiran tidak ditemukan"]);
  }

  return {
    id_jadwal: id,
    kelas: kehadiranMurid[0].jadwal.kelas.kelas,
    tanggal: kehadiranMurid[0].tanggal,
    murid: kehadiranMurid.map((murid) => {
      murid.murid.keterangan = murid.keterangan;
      return murid.murid;
    }),
  };
};

export default { create, get };

const createJadwal = async () => {
  const result = await prismaClient.$queryRaw`select * from jadwal`;
  console.log(result);
  // return;
};

// create();
