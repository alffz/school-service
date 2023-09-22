import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const secretKey = process.env.SECRET_KEY;
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res
        .status(401)
        .json({ errors: ["Unauthorize"] })
        .end();
    }

    if (token) {
      const user = jwt.verify(token, secretKey);
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};
