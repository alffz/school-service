import express from "express";
import ruangKelasController from "../controller/ruang-kelas-controlle.js";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
const ruangKelas = express.Router();

ruangKelas.post(
  "/api/v1/ruang-kelas",
  allowedRole(["admin"]),
  ruangKelasController.create
);
ruangKelas.put(
  "/api/v1/ruang-kelas/:id",
  allowedRole(["admin"]),
  ruangKelasController.update
);
ruangKelas.delete(
  "/api/v1/ruang-kelas/:id",
  allowedRole(["admin"]),
  ruangKelasController.remove
);

ruangKelas.get(
  "/api/v1/ruang-kelas/:id",
  allowedRole(["admin"]),
  ruangKelasController.getById
);

ruangKelas.get(
  "/api/v1/ruang-kelas",
  allowedRole(["admin"]),
  ruangKelasController.get
);

export default ruangKelas;
