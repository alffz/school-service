import express from "express";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
import pelajaranController from "../controller/pelajaran-controlle.js";
const pelajaranRoute = express.Router();

pelajaranRoute.post(
  "/api/v1/pelajaran",
  allowedRole(["admin"]),
  pelajaranController.create
);
pelajaranRoute.put(
  "/api/v1/pelajaran/:id",
  allowedRole(["admin"]),
  pelajaranController.update
);
pelajaranRoute.delete(
  "/api/v1/pelajaran/:id",
  allowedRole(["admin"]),
  pelajaranController.remove
);
pelajaranRoute.get(
  "/api/v1/pelajaran/:id",
  allowedRole(["admin"]),
  pelajaranController.getById
);
pelajaranRoute.get(
  "/api/v1/pelajaran",
  allowedRole(["admin"]),
  pelajaranController.get
);
pelajaranRoute.get(
  "/api/v1/pelajaran/pelajaran/:pelajaran",
  allowedRole(["admin"]),
  pelajaranController.getByName
);
export default pelajaranRoute;
