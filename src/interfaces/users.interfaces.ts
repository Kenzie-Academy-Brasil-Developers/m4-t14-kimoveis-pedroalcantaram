import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  returnUserSchema,
  updateUserSchema,
  userListSchema,
  userSchema,
} from "../schemas";

type TUser = z.infer<typeof userSchema>;
type TUserReturn = z.infer<typeof returnUserSchema>;
type TUserListReturn = z.infer<typeof userListSchema>;
type TUserUpdate = DeepPartial<typeof updateUserSchema>;

export { TUser, TUserReturn, TUserListReturn, TUserUpdate };
