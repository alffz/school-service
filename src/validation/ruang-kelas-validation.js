import joi from "joi";

export const createRuangKelasSchema = joi.object({
  nomor_ruangan: joi.number().required().positive(),
  kapasitas: joi.number().required().positive(),
  tersedia: joi.boolean(),
});

export const idSchema = joi.number().positive().required();
export const sortSchema = joi.string().required();
