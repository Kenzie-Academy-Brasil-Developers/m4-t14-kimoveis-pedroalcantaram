import { Request, Response } from "express";
import { TUser, TUserUpdate } from "../interfaces";
import { usersServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: TUser = req.body;

  const newUser = await usersServices.create(payload);

  return res.status(201).json(newUser);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const usersList = await usersServices.read();

  return res.json(usersList);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const payload: TUserUpdate = req.body;
  const updatedUser = await usersServices.update(payload, userId);

  return res.json(updatedUser);
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  const userId = Number(req.params.id);

  await usersServices.remove(userId);

  return res.status(204).send();
};

export default { create, read, remove, update };
