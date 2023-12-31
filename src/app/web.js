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
import kehadiran from "../routes/kehadiran-route.js";
import cors from "cors";

const web = express();
web.use(cookieParser());
web.use(express.json());
web.use(
  cors({
    origin: ["http://localhost:3001", "https://school-web-six.vercel.app"], // allow for this url
    credentials: true, //to set cookie in localstorage , but postman didn need it
  })
);
web.use(publicRoute);

web.use(authMiddleware);

web.use(adminRoute);
web.use(ruangKelas);
web.use(kelasRoute);
web.use(guruRoute);
web.use(pelajaranRoute);
web.use(muridRoute);
web.use(jadwalRoute);
web.use(kehadiran);

web.use(errorMiddleware);

export default web;
