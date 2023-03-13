import { z } from "zod";
import { addressSchema, returnAddressSchema } from "../schemas";

type TAddress = z.infer<typeof addressSchema>;
type TAddressReturn = z.infer<typeof returnAddressSchema>;

export { TAddress, TAddressReturn };
