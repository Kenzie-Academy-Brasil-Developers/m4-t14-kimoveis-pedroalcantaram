import { z } from "zod";
import { returnRealEstateSchema } from "./realEstate.schemas";
import { returnUserSchema } from "./users.schemas";

const schedulesSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const returnSchedulesSchema = schedulesSchema
  .extend({
    id: z.number(),
    realEstate: returnRealEstateSchema,
    user: returnUserSchema,
  })
  .omit({ realEstateId: true });

const listSchedulesSchema = returnSchedulesSchema.array();

export { schedulesSchema, returnSchedulesSchema, listSchedulesSchema };
