import userService from "../service/admin-servic.js";

const create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userService.update(id, req.body);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await userService.remove(id);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 20;
    const result = await userService.get({ page, perPage });
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

export default { create, update, remove, get };
