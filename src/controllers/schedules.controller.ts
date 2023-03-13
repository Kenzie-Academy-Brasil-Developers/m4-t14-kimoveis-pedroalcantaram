import { Request, Response } from "express";
import { TSchedules } from "../interfaces";
import schedulesServices from "../services/schedules.services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = req.user.id;
  const payload: TSchedules = req.body;

  const newSchedule: string = await schedulesServices.create(payload, userId);

  return res.status(201).json({ message: newSchedule });
};

const readByRealEstate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate: number = Number(req.params.id);

  const response = await schedulesServices.readByRealEstate(realEstate);

  return res.json(response);
};

export default { create, readByRealEstate };
