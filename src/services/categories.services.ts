import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
import {
  TCategories,
  TCategory,
  TRealEstateByCategory,
  TReturnCategory,
} from "../interfaces";

import {
  categoriesSchema,
  returnCategorySchema,
  returnRealEstateByCategorySchema,
} from "../schemas";

const create = async (payload: TCategory): Promise<TReturnCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const existenceCategory: Category | null = await categoryRepository.findOneBy(
    {
      name: payload.name,
    }
  );

  if (existenceCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category: TCategory = categoryRepository.create(payload);

  await categoryRepository.save(category);

  const newCategory: TReturnCategory = returnCategorySchema.parse(category);

  return newCategory;
};

const read = async (): Promise<TCategories> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: TCategories = await categoryRepository.find();

  const parsedCategoriesList: TCategories = categoriesSchema.parse(categories);

  return parsedCategoriesList;
};

const readRealEstateByCategory = async (
  categoryId: number
): Promise<TRealEstateByCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const response: TRealEstateByCategory = category;

  return response;
};

export default { create, read, readRealEstateByCategory };
