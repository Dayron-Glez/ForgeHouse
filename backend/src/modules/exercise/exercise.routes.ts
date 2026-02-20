import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import * as exerciseController from "./exercise.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", exerciseController.getExercises);
router.get("/:id", exerciseController.getExerciseById);

export default router;
