import { Request, Response } from "express";
import { TCategories, TCategory, TReturnCategory } from "../interfaces";
import { categoriesServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: TCategory = req.body;

  const newCategory: TReturnCategory = await categoriesServices.create(payload);

  return res.status(201).json(newCategory);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const categories: TCategories = await categoriesServices.read();

  return res.json(categories);
};

const readRealEstateByCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = Number(req.params.id);

  const response = await categoriesServices.readRealEstateByCategory(
    categoryId
  );

  return res.json(response);
};

export default { create, read, readRealEstateByCategory };
