import kehadiranService from "../service/kehadiran-servic.js";

const create = async (req, res, next) => {
  try {
    await kehadiranService.create(req.body);

    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const tanggal = req.query.tanggal;
    const id = req.query.id_jadwal;

    const result = await kehadiranService.get({ id, tanggal });

    res.status(200).json({ message: "SUCCESS", data: result }).end();
  } catch (err) {
    next(err);
  }
};
export default { create, get };
