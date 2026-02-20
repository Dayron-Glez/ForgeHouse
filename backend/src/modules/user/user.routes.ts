import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { uploadAvatar } from "../../middleware/upload.middleware";
import { updateProfileSchema } from "./user.schema";
import * as userController from "./user.controller";

const router = Router();

router.use(authMiddleware);

router.get("/me", userController.getProfile);
router.patch(
  "/me",
  validate(updateProfileSchema),
  userController.updateProfile,
);
router.post(
  "/me/avatar",
  uploadAvatar.single("avatar"),
  userController.uploadAvatar,
);
router.delete("/me/avatar", userController.removeAvatar);

export default router;
