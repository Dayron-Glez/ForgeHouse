import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { sendSuccess, sendError } from "../../utils/api-response.utils";
import * as appointmentService from "./appointment.service";

export const getAppointments = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const month = req.query.month as string | undefined;
    const status = req.query.status as string | undefined;
    const appointments = await appointmentService.getAppointments(req.userId!, {
      month,
      status,
    });
    sendSuccess(res, appointments);
  } catch (error: any) {
    sendError(res, "INTERNAL_ERROR", error.message, 500);
  }
};

export const getAppointmentById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const appointment = await appointmentService.getAppointmentById(
      String(req.params.id),
      req.userId!,
    );
    sendSuccess(res, appointment);
  } catch (error: any) {
    sendError(res, "NOT_FOUND", error.message, 404);
  }
};

export const createAppointment = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const appointment = await appointmentService.createAppointment(
      req.userId!,
      req.body,
    );
    sendSuccess(res, appointment, "Cita creada exitosamente", 201);
  } catch (error: any) {
    if (error.message.includes("horario")) {
      sendError(res, "CONFLICT", error.message, 409);
    } else {
      sendError(res, "INTERNAL_ERROR", error.message, 500);
    }
  }
};

export const updateAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const appointment = await appointmentService.updateAppointment(
      String(req.params.id),
      req.userId!,
      req.body,
    );
    sendSuccess(res, appointment, "Cita actualizada");
  } catch (error: any) {
    if (error.message.includes("horario")) {
      sendError(res, "CONFLICT", error.message, 409);
    } else if (error.message.includes("no encontrada")) {
      sendError(res, "NOT_FOUND", error.message, 404);
    } else {
      sendError(res, "BAD_REQUEST", error.message, 400);
    }
  }
};

export const cancelAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const appointment = await appointmentService.cancelAppointment(
      String(req.params.id),
      req.userId!,
    );
    sendSuccess(res, appointment, "Cita cancelada");
  } catch (error: any) {
    if (error.message.includes("no encontrada")) {
      sendError(res, "NOT_FOUND", error.message, 404);
    } else {
      sendError(res, "BAD_REQUEST", error.message, 400);
    }
  }
};
