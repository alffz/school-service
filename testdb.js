import { prismaClient } from "./src/app/database.js";

const request = {
  id_pelajaran: 995,
  id_guru: 3529,
  id_kelas: 556,
  hari: 1,
  mulai: { jam: 9, menit: 1 },
  berakhir: { jam: 9, menit: 0 },
};
const testGetJadwal = async (request) => {
  const result = await prismaClient.$queryRaw`SELECT *
  FROM jadwal
  WHERE id_pelajaran= ${request.id_pelajaran}
    AND id_guru = ${request.id_guru}
    AND hari = ${request.hari}
    AND (
      CAST(JSON_EXTRACT(mulai, '$.jam') AS UNSIGNED) * 60 +
      CAST(JSON_EXTRACT(mulai, '$.menit') AS UNSIGNED)
    ) BETWEEN ${request.mulai.jam} * 60 + ${request.mulai.menit} AND ${request.berakhir.jam} * 60 + ${request.berakhir.menit}
    AND (
      CAST(JSON_EXTRACT(berakhir, '$.jam') AS UNSIGNED) * 60 +
      CAST(JSON_EXTRACT(berakhir, '$.menit') AS UNSIGNED)
    ) BETWEEN ${request.mulai.jam} * 60 + ${request.mulai.menit} AND ${request.berakhir.jam} * 60 + ${request.berakhir.menit}`;
  console.log(result.length);
};
testGetJadwal(request);
