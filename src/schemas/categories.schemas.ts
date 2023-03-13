import { z } from "zod";
import { listRealEstateByCategorySchema } from "./realEstate.schemas";

const categorySchema = z.object({
  name: z.string().max(45),
});

const returnCategorySchema = categorySchema.extend({
  id: z.number(),
});

const categoriesSchema = returnCategorySchema.array();

const returnRealEstateByCategorySchema = returnCategorySchema.extend({
  realEstate: listRealEstateByCategorySchema,
});

export {
  categorySchema,
  returnCategorySchema,
  categoriesSchema,
  returnRealEstateByCategorySchema,
};
