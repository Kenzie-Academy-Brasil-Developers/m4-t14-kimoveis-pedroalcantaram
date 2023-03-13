import { Router } from "express";
import { loginControllers } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { loginSchema } from "../schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(loginSchema),
  loginControllers.create
);

export default loginRoutes;
