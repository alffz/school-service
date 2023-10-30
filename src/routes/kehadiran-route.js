import express from "express";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
import kehadiranController from "../controller/kehadiran-controlle.js";

const kehadiran = express.Router();

kehadiran.post(
  "/api/v1/kehadiran",
  allowedRole(["guru"]),
  kehadiranController.create
);
kehadiran.get(
  "/api/v1/kehadiran/murid/apa",
  // allowedRole(["guru", "admin"]),
  kehadiranController.get
);
export default kehadiran;
