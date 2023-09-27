import joi from "joi";

export const createSchema = joi.object({
  username: joi.string().required().max(50),
  email: joi.string().email().required().max(50),
  password: joi.string().required(),
  id_kelas: joi.number().optional(),
});

export const idSchema = joi.number().positive().required();
export const userNameSchema = joi.string();
export const pageSchema = joi.number().positive();
export const perPageSchema = joi.number().positive();

export const allowedFieldsSchema = joi.object();
