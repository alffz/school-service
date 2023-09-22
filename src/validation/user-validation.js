// create schema using joi
import joi from "joi";

export const createUserSchema = joi.object({
  username: joi.string().required().max(50),
  email: joi.string().email().required().max(50),
  password: joi.string().required(),
  role: joi.valid("ADMIN", "TEACHER", "STUDENT"),
});

export const loginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
  role: joi.valid("admin", "guru", "murid").required(),
});
