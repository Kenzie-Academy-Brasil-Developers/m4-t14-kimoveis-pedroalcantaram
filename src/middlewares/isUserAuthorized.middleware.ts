import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const isUserAuthorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tokenId: number = req.user.id;
  const paramId: number = Number(req.params.id);
  const isAdmin: boolean = req.user.isAdmin;

  if (!isAdmin && tokenId !== paramId) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default isUserAuthorizedMiddleware;
