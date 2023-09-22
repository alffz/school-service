import ResponseError from "../error/response-error.js";
import jwt from "jsonwebtoken";
const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.messages,
    });
  } else if (err instanceof jwt.JsonWebTokenError) {
    res
      .status(401)
      .json({
        errors: ["Unauthorize"],
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: err.message,
      })
      .end();
  }
};

export default errorMiddleware;
