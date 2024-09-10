import jwt from "jsonwebtoken";
import AppError from "../AppError.js";

export const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, userInfo) => {
      if (error) {
        throw new AppError(400, "Token not valid", 401);
      }
      req.user = userInfo;
      next();
    });
  } else {
    throw new AppError(400, "you are not authorized", 401);
  }
};
export const verifyAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      next();
    } else {
      throw new AppError(400, "you are not authorized", 401);
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new AppError(400, "you are not admin", 401);
    }
  });
};
