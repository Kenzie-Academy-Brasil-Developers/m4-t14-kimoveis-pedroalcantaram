import { z } from "zod";

const userSchema = z.object({
  name: z.string().max(45),
  email: z.string().max(45).email(),
  admin: z.boolean().optional().default(false),
  password: z.string().max(120),
});

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish(),
  })
  .omit({ password: true });

const updateUserSchema = z.object({
  name: z.string().max(45).optional(),
  email: z.string().max(45).email().optional(),
  password: z.string().max(120).optional(),
});

const userListSchema = returnUserSchema.array();

export { userSchema, returnUserSchema, userListSchema, updateUserSchema };
