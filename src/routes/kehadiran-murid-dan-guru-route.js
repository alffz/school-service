import express from "express";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
import kehadiranMuridDanGuruController from "../controller/kehadiran-murid-dan-guru-controlle.js";

const kehadiranMuridDanGuruRoute = express.Router();

kehadiranMuridDanGuruRoute.post(
  "/api/v1/kehadiran-murid-dan-guru",
  allowedRole(["guru"]),
  kehadiranMuridDanGuruController.create
);
kehadiranMuridDanGuruRoute.get(
  "/api/v1/:id_jadwal/kehadiran-murid",
  allowedRole(["guru"]),
  kehadiranMuridDanGuruController.get
);
export default kehadiranMuridDanGuruRoute;
