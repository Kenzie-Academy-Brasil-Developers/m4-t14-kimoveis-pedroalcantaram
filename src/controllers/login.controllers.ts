import { Request, Response } from "express";
import { loginServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;
  const token = await loginServices.create(payload);
  return res.json({
    token: token,
  });
};

export default { create };
