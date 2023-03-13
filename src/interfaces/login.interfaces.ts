import { type } from "os";
import { z } from "zod";
import { loginSchema } from "../schemas";

type TLogin = z.infer<typeof loginSchema>;

export { TLogin };
