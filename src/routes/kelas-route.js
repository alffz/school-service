import express from "express";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
import kelasControlle from "../controller/kelas-controlle.js";
const kelasRoute = express.Router();

kelasRoute.post("/api/v1/kelas", allowedRole(["admin"]), kelasControlle.create);
kelasRoute.put(
  "/api/v1/kelas/:id",
  allowedRole(["admin"]),
  kelasControlle.update
);
kelasRoute.delete(
  "/api/v1/kelas/:id",
  allowedRole(["admin"]),
  kelasControlle.remove
);
kelasRoute.get(
  "/api/v1/kelas/:id",
  allowedRole(["admin"]),
  kelasControlle.getById
);
kelasRoute.get("/api/v1/kelas", allowedRole(["admin"]), kelasControlle.get);

export default kelasRoute;
