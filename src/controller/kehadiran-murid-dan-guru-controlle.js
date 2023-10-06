import { prismaClient } from "../app/database.js";
import jadwalServic from "../service/jadwal-servic.js";
import kehadiranMuridDanGuruServic from "../service/kehadiran-murid-dan-guru-servic.js";

const create = async (req, res, next) => {
  try {
    // console.log(req.body);
    const result = await kehadiranMuridDanGuruServic.create(req.body);
    // console.log(result);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const tanggal = req.query.tanggal;
    const id = req.params.id_jadwal;

    const result = await kehadiranMuridDanGuruServic.get({ id, tanggal });

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const getByGuru = async (req, res, next) => {
  try {
    const username = req.query.username;

    const result = await jadwalServic.getByGuru({ username });
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const getByKelas = async (req, res, next) => {
  try {
    const kelas = req.query.kelas;

    const result = await jadwalServic.getByKelas({ kelas });
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

export default { create, get, getByGuru, getByKelas };
