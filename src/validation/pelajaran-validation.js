import joi from "joi";

export const createSchema = joi.object({
  pelajaran: joi.string().required().max(50),
});

export const idSchema = joi.number().positive().required();
export const pageSchema = joi.number().positive().required();
export const perPageSchema = joi.number().positive().required();
