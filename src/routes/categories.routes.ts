import { Router } from "express";
import { categoriesController } from "../controllers";
import {
  ensureDataIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureTokenIsValidMiddleware,
} from "../middlewares";
import { categorySchema } from "../schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(categorySchema),
  categoriesController.create
);

categoriesRoutes.get("", categoriesController.read);

categoriesRoutes.get(
  "/:id/realEstate",
  categoriesController.readRealEstateByCategory
);

export default categoriesRoutes;
