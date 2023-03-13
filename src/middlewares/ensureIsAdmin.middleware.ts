import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = req.user.isAdmin;

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};

export default ensureIsAdminMiddleware;
