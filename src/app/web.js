import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "../middleware/error-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import publicRoute from "../routes/public-route.js";
import adminRoute from "../routes/admin-route.js";
import ruangKelas from "../routes/ruang-kelas-route.js";
import kelasRoute from "../routes/kelas-route.js";
import guruRoute from "../routes/guru-route.js";
import pelajaranRoute from "../routes/pelajaran-route.js";
import muridRoute from "../routes/murid-route.js";
import jadwalRoute from "../routes/jadwal-route.js";

const web = express();
web.use(cookieParser());
web.use(express.json());

web.use(publicRoute);

web.use(authMiddleware);

web.use(adminRoute);
web.use(ruangKelas);
web.use(kelasRoute);
web.use(guruRoute);
web.use(pelajaranRoute);
web.use(muridRoute);
web.use(jadwalRoute);

web.use(errorMiddleware);

export default web;
