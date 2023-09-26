import guruService from "../service/guru-servic.js";
import { filterRequestData } from "../utils/utils.js";

const create = async (req, res, next) => {
  try {
    const result = await guruService.create(req.body);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const allowedFields = req.fields[req.user.role];
    const request = filterRequestData(req.body, allowedFields);

    await guruService.update({ id, request });
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await guruService.remove(id);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await guruService.getById({ id });
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 20;
    const sort = req.query.sort || "desc";
    const username = req.query.username || null;

    const result = await guruService.get({ page, perPage, sort, username });
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

export default { create, update, remove, getById, get };
