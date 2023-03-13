import { Router } from "express";
import schedulesController from "../controllers/schedules.controller";
import {
  ensureDataIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureTokenIsValidMiddleware,
} from "../middlewares";
import { schedulesSchema } from "../schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(schedulesSchema),
  schedulesController.create
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  schedulesController.readByRealEstate
);

export default schedulesRoutes;
