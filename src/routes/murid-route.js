import express from "express";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
import { allowedFields } from "../middleware/allowedFields-middleware.js";
import muridController from "../controller/murid-controlle.js";
import { restrictAccessToOwnData } from "../middleware/allowedSelf-middleware.js";

const muridRoute = express.Router();

muridRoute.post(
  "/api/v1/murid",
  allowedRole(["admin"]),
  muridController.create
);
muridRoute.put(
  "/api/v1/murid/:id",
  allowedRole(["admin", "murid"]),
  allowedFields({
    admin: ["username", "email", "password", "id_kelas"],
    murid: ["username", "email", "password"],
  }),
  restrictAccessToOwnData(["murid"]),
  muridController.update
);
muridRoute.delete(
  "/api/v1/murid/:id",
  allowedRole(["admin"]),
  muridController.remove
);
muridRoute.get(
  "/api/v1/murid/:id",
  restrictAccessToOwnData(["murid"]),
  muridController.getById
);
muridRoute.get("/api/v1/murid", muridController.get);

export default muridRoute;
