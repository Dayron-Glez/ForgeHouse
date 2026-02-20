import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { calculateBmiSchema } from "./bmi.schema";
import * as bmiController from "./bmi.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", bmiController.getBmiHistory);
router.post("/", validate(calculateBmiSchema), bmiController.calculateBmi);
router.delete("/:id", bmiController.deleteBmiRecord);

export default router;
