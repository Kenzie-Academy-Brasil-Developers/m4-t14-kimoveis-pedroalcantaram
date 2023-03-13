import { Router } from "express";
import { usersController } from "../controllers";
import {
  ensureDataIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureTokenIsValidMiddleware,
  isUserAuthorizedMiddleware,
  verifyUserExistsMiddleware,
} from "../middlewares";
import { updateUserSchema, userSchema } from "../schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  usersController.create
);

usersRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  usersController.read
);

usersRoutes.patch(
  "/:id",
  verifyUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  isUserAuthorizedMiddleware,
  ensureDataIsValidMiddleware(updateUserSchema),
  usersController.update
);

usersRoutes.delete(
  "/:id",
  verifyUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  usersController.remove
);

export default usersRoutes;
