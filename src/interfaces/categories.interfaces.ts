import { z } from "zod";
import {
  categoriesSchema,
  categorySchema,
  returnCategorySchema,
  returnRealEstateByCategorySchema,
} from "../schemas";

type TCategory = z.infer<typeof categorySchema>;
type TReturnCategory = z.infer<typeof returnCategorySchema>;
type TCategories = z.infer<typeof categoriesSchema>;
type TRealEstateByCategory = z.infer<typeof returnRealEstateByCategorySchema>;

export { TCategory, TCategories, TReturnCategory, TRealEstateByCategory };
