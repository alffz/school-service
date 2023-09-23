import userService from "../service/admin-servic.js";
import ruangKelasServic from "../service/ruang-kelas-servic.js";

const create = async (req, res, next) => {
  try {
    const result = await ruangKelasServic.create(req.body);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const id = req.params.id;

    await ruangKelasServic.update(id, req.body);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await ruangKelasServic.remove(id);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await ruangKelasServic.getById(id);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 20;
    const sort = req.query.sort || "asc";
    const kapasitas = req.query.kapasitas || null;

    const result = await ruangKelasServic.get({
      page,
      perPage,
      sort,
      kapasitas,
    });
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

export default { create, update, remove, getById, get };
