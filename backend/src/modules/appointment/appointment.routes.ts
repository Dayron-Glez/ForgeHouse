import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createAppointmentSchema, updateAppointmentSchema } from "./appointment.schema";
import * as appointmentController from "./appointment.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", appointmentController.getAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.post("/", validate(createAppointmentSchema), appointmentController.createAppointment);
router.patch("/:id", validate(updateAppointmentSchema), appointmentController.updateAppointment);
router.patch("/:id/cancel", appointmentController.cancelAppointment);

export default router;
