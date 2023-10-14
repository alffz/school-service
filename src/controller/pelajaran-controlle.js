import pelajaranServic from "../service/pelajaran-servic.js";

const create = async (req, res, next) => {
  try {
    const result = await pelajaranServic.create(req.body);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const id = req.params.id;

    await pelajaranServic.update(id, req.body);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await pelajaranServic.remove(id);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await pelajaranServic.getById(id);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 20;

    const result = await pelajaranServic.get({
      page,
      perPage,
    });
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const getByName = async (req, res, next) => {
  try {
    const pelajaran = req.params.pelajaran;

    const result = await pelajaranServic.getByName(pelajaran);

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};
export default { create, update, remove, getById, get, getByName };
