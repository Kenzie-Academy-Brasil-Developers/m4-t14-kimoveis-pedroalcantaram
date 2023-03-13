import { z } from "zod";
import { addressSchema } from "./address.schemas";
import { returnCategorySchema } from "./categories.schemas";

const realEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().gt(0),
  address: addressSchema,
  categoryId: z.number(),
});

const realEstateWithCategorySchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().gt(0),
  address: addressSchema,
  category: returnCategorySchema,
});

const returnRealEstateSchema = realEstateSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    sold: z.boolean(),
  })
  .omit({ categoryId: true });

const listRealEstateByCategorySchema = returnRealEstateSchema
  .omit({
    address: true,
  })
  .array();

const listRealEstateSchema = returnRealEstateSchema.array();

export {
  realEstateSchema,
  returnRealEstateSchema,
  realEstateWithCategorySchema,
  listRealEstateSchema,
  listRealEstateByCategorySchema,
};
