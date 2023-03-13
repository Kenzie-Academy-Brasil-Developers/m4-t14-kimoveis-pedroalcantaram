import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const verifyUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = Number(req.params.id);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const verifiedUser: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!verifiedUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default verifyUserExistsMiddleware;
