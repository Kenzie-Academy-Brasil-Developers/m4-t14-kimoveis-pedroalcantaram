import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";

const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: Number(decoded.sub),
      isAdmin: decoded.admin,
    };
  });

  return next();
};

export default ensureTokenIsValidMiddleware;
