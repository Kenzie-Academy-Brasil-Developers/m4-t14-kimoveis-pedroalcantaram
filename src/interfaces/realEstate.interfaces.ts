import { z } from "zod";
import {
  realEstateSchema,
  returnRealEstateSchema,
  realEstateWithCategorySchema,
  listRealEstateSchema,
} from "../schemas";

type TRealEstate = z.infer<typeof realEstateSchema>;
type TRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
type TRealEstateWithCategoryReturn = z.infer<
  typeof realEstateWithCategorySchema
>;
type TRealEstateList = z.infer<typeof listRealEstateSchema>;

export {
  TRealEstate,
  TRealEstateReturn,
  TRealEstateWithCategoryReturn,
  TRealEstateList,
};
