import validate from "../validation/validaton.js";
import ResponseError from "../error/response-error.js";
import {
  createUserSchema,
  loginSchema,
} from "../validation/user-validation.js";
import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { request } from "express";
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const tokenExpired = 60 * 60 * 24; // 15 menit
const refreshTokenExpired = 60 * 60 * 24; // 24 jam

const login = async (request) => {
  request = validate(loginSchema, request);

  const roles = {
    admin: prismaClient.admin,
    guru: prismaClient.guru,
    murid: prismaClient.murid,
  };

  const userRole = roles[request.role];

  const user = await userRole.findFirst({
    where: {
      email: request.email,
    },
  });

  if (!user) {
    throw new ResponseError(401, ["Username or password wrong"]);
  }

  const password = await bcrypt.compare(request.password, user.password);

  if (!password) {
    throw new ResponseError(401, ["Username or password wrong"]);
  }

  const tokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: request.role,
  };

  const token = jwt.sign(tokenPayload, secretKey, { expiresIn: tokenExpired });
  const refreshToken = jwt.sign(tokenPayload, secretKey, {
    expiresIn: refreshTokenExpired,
  });

  return { token, refreshToken, role: request.role };
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ResponseError(401, ["Unauthorize"]);
  } else {
    const user = jwt.verify(refreshToken, secretKey);

    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, secretKey, {
      expiresIn: tokenExpired,
    });
    const newRefreshToken = jwt.sign(tokenPayload, secretKey, {
      expiresIn: refreshTokenExpired,
    });

    return { token, newRefreshToken, role: user.role };
  }
};

const create = async (request) => {
  request = validate(createUserSchema, request);

  request.password = await bcrypt.hash(request.password, 10);

  return prismaClient.user.create({
    data: request,
  });
};

export default { login, refreshToken, create };
