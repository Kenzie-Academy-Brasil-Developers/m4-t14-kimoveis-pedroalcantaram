import { Repository } from "typeorm";
import app from "../app";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import {
  TUser,
  TUserListReturn,
  TUserReturn,
  TUserUpdate,
} from "../interfaces";
import { returnUserSchema, userListSchema } from "../schemas";

const create = async (payload: TUser): Promise<TUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const existenceUser: User | null = await userRepository.findOneBy({
    email: payload.email,
  });

  if (existenceUser) {
    throw new AppError("Email already exists", 409);
  }

  const user: TUser = userRepository.create(payload);

  await userRepository.save(user);

  const newUser: TUserReturn = returnUserSchema.parse(user);

  return newUser;
};

const read = async (): Promise<TUserListReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const usersList: TUserListReturn = await userRepository.find();

  const parsedUserList = userListSchema.parse(usersList);

  return parsedUserList;
};

const update = async (
  payload: TUserUpdate,
  userId: number
): Promise<TUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUser: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const user: User = userRepository.create({
    ...oldUser,
    ...payload,
  });

  await userRepository.save(user);

  const updatedUser: TUserReturn = returnUserSchema.parse(user);

  return updatedUser;
};

const remove = async (userId: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  await userRepository.softRemove(user!);
};

export default { create, read, remove, update };
