import express from "express";
import { allowedRole } from "../middleware/allowedRole-middleware.js";
import adminControlle from "../controller/admin-controlle.js";

const adminRoute = express.Router();

adminRoute.post("/api/v1/admin", allowedRole(["admin"]), adminControlle.create);
adminRoute.patch(
  "/api/v1/admin/:id",
  allowedRole(["admin"]),
  adminControlle.update
);
adminRoute.delete(
  "/api/v1/admin/:id",
  allowedRole(["admin"]),
  adminControlle.remove
);
adminRoute.get("/api/v1/admin", allowedRole(["admin"]), adminControlle.get);
export default adminRoute;
