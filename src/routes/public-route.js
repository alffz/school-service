import express from "express";
import userController from "../controller/user-controller.js";
const publicRoute = express.Router();

publicRoute.post("/api/v1/user/login", userController.login);
publicRoute.post("/api/v1/user/refreshtoken", userController.refreshToken);

export default publicRoute;
