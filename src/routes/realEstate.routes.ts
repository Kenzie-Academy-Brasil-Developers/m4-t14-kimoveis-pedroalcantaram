import { Router } from "express";
import { realEstateController } from "../controllers";
import {
  ensureDataIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureTokenIsValidMiddleware,
} from "../middlewares";
import { realEstateSchema } from "../schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(realEstateSchema),
  realEstateController.create
);

realEstateRoutes.get("", realEstateController.read);

export default realEstateRoutes;
