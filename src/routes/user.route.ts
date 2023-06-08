import { validateUser } from "./../middlewares/validation.middleware ";
import userController from "./../controllers/user.controller";

import { Router } from "express";

const router = Router();

router.get("/", userController.fetchAllUsers);

router
  .route("/:id")
  .get(userController.fetchUser)
  .put(validateUser, userController.updateUser)
  .delete(userController.deleteUser);

router.put("/:id/upload", userController.uploadAvatar);

export default router;
