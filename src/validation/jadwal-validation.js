import joi from "joi";

export const createSchema = joi.object({
  id_pelajaran: joi.number().positive().required(),
  id_guru: joi.number().positive().required(),
  id_kelas: joi.number().positive().required(),
  hari: joi.number().min(0).max(6).required(),
  mulai: joi.object({
    jam: joi.number().required().min(0).max(24),
    menit: joi.number().required().min(0).max(59),
  }),
  berakhir: joi.object({
    jam: joi.number().required().min(0).max(24),
    menit: joi.number().required().min(0).max(59),
  }),
  status: joi.valid(true, false),
});

export const idSchema = joi.number().positive().required();
export const hariSchema = joi.string().required();
export const userNameSchema = joi.string();
export const kelasSchema = joi.string();
export const statusSchema = joi.valid("true", "false");
export const pageSchema = joi.number().positive();
export const perPageSchema = joi.number().positive();
