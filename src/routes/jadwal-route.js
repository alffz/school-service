import express from "express";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
import { allowedFields } from "../middleware/allowedFields-middleware.js";
import { restrictAccessToOwnData } from "../middleware/allowedSelf-middleware.js";
import jadwalController from "../controller/jadwal-controlle.js";

const jadwalRoute = express.Router();

jadwalRoute.post(
  "/api/v1/jadwal",
  allowedRole(["admin"]),
  jadwalController.create
);
jadwalRoute.put(
  "/api/v1/jadwal/:id",
  allowedRole(["admin"]),
  jadwalController.update
);
jadwalRoute.delete(
  "/api/v1/jadwal/:id",
  allowedRole(["admin"]),
  jadwalController.remove
);
jadwalRoute.get(
  "/api/v1/jadwal/:id",
  allowedRole(["admin"]),
  jadwalController.getById
);
jadwalRoute.get(
  "/api/v1/jadwal/hari/:hari",
  allowedRole(["admin"]),
  jadwalController.get
);
jadwalRoute.get(
  "/api/v1/jadwal/guru/username",
  allowedRole(["admin"]),
  jadwalController.getByGuru
);
jadwalRoute.get(
  "/api/v1/jadwal/kelas/kelasName",
  allowedRole(["admin"]),
  jadwalController.getByKelas
);

export default jadwalRoute;
