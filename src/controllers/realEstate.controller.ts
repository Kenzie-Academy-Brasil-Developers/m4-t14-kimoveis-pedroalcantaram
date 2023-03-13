import { Request, Response } from "express";
import { TRealEstateList, TRealEstateWithCategoryReturn } from "../interfaces";
import { realEstateServiches } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;
  const newRealEstate: TRealEstateWithCategoryReturn =
    await realEstateServiches.create(payload);
  return res.status(201).json(newRealEstate);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const realEstateList: TRealEstateList = await realEstateServiches.read();
  return res.json(realEstateList);
};

export default { create, read };
