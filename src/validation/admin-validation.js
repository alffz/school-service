import joi from "joi";

export const createAdminSchema = joi.object({
  username: joi.string().required().max(50),
  email: joi.string().email().required().max(50),
  password: joi.string().required(),
});

export const idSchema = joi.number().positive().required();
