import express from "express";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
import guruController from "../controller/guru-controlle.js";
import { allowedFields } from "../middleware/allowedFields-middleware.js";

const guruRoute = express.Router();

guruRoute.post("/api/v1/guru", allowedRole(["admin"]), guruController.create);
guruRoute.patch(
  "/api/v1/guru/:id",
  allowedRole(["admin", "guru"]),
  allowedFields({
    admin: ["username", "email", "password", "id_kelas"],
    guru: ["username", "email", "password"],
  }),
  guruController.update
);
guruRoute.delete(
  "/api/v1/guru/:id",
  allowedRole(["admin"]),
  guruController.remove
);
guruRoute.get(
  "/api/v1/guru/:id",
  allowedRole(["admin", "guru"]),
  guruController.getById
);
guruRoute.get("/api/v1/guru", guruController.get);

export default guruRoute;
