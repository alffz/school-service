import userService from "../service/admin-servic.js";
import kelasService from "../service/kelas-servic.js";

const create = async (req, res, next) => {
  try {
    const result = await kelasService.create(req.body);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const id = req.params.id;

    await kelasService.update(id, req.body);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await kelasService.remove(id);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await kelasService.getById(id);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 20;
    const kelas = req.query.kelas || null;
    console.log(page);
    const result = await kelasService.get({
      page,
      perPage,
      kelas,
    });
    res.status(200).json({ message: "SUCCESS", data: result }).end();
    console.log(result);
  } catch (err) {
    next(err);
  }
};

export default { create, update, remove, getById, get };
