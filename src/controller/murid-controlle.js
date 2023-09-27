import muridServic from "../service/murid-servic.js";
import { filterRequestData } from "../utils/utils.js";

const create = async (req, res, next) => {
  try {
    const result = await muridServic.create(req.body);
    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const allowedFields = req.fields[req.user.role];
    const request = filterRequestData(req.body, allowedFields); // move to allowedFields-middleware

    await muridServic.update({ id, request });
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await muridServic.remove(id);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await muridServic.getById({ id });

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 20;
    const username = req.query.username || null;
    const result = await muridServic.get({ page, perPage, username });

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};

export default { create, update, remove, getById, get };
