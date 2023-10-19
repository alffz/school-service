import jadwalServic from "../service/jadwal-servic.js";

const create = async (req, res, next) => {
  try {
    const result = await jadwalServic.create(req.body);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const request = req.body;

    await jadwalServic.update({ id, request });
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await jadwalServic.remove(id);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await jadwalServic.getById({ id });

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 20;
    const hari = req.params.hari || "senin";

    const result = await jadwalServic.get({ page, perPage, hari });

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const getByGuru = async (req, res, next) => {
  try {
    const username = req.params.username;

    const result = await jadwalServic.getByGuru(username);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const getByKelas = async (req, res, next) => {
  try {
    const kelas = req.params.kelas;

    const result = await jadwalServic.getByKelas(kelas);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

export default { create, update, remove, getById, get, getByGuru, getByKelas };
