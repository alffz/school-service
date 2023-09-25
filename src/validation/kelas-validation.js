import joi from "joi";

export const createKelasSchema = joi.object({
  nomor_ruang_kelas: joi.number().required().positive(),
  kelas: joi.string().required(),
});

export const idSchema = joi.number().positive().required();
export const sortSchema = joi.string().required();
export const kelasSchema = joi.string().required();
