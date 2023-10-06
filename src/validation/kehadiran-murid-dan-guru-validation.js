import joi from "joi";

export const createSchema = joi.object({
  id_jadwal: joi.number().positive().required(),
  id_guru: joi.number().positive().required(),
  tanggal: joi.string().required(),
  murid: joi.array().items(
    joi.object({
      id: joi.number().positive().required(),
      keterangan: joi.string(),
    })
  ),
});

export const idSchema = joi.number().positive().required();
export const tanggalSchema = joi.string().required();
