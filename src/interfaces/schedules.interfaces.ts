import { z } from "zod";
import { returnSchedulesSchema, schedulesSchema } from "../schemas";

type TSchedules = z.infer<typeof schedulesSchema>;
type TSchedulesReturn = z.infer<typeof returnSchedulesSchema>;

export { TSchedules, TSchedulesReturn };
