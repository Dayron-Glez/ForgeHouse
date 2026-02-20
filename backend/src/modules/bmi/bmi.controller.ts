import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { sendSuccess, sendError } from "../../utils/api-response.utils";
import * as bmiService from "./bmi.service";

export const calculateBmi = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const record = await bmiService.calculateBmi(req.userId!, req.body);
    sendSuccess(res, record, "IMC calculado exitosamente", 201);
  } catch (error: any) {
    sendError(res, "INTERNAL_ERROR", error.message, 500);
  }
};

export const getBmiHistory = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const records = await bmiService.getBmiHistory(req.userId!);
    sendSuccess(res, records);
  } catch (error: any) {
    sendError(res, "INTERNAL_ERROR", error.message, 500);
  }
};

export const deleteBmiRecord = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    await bmiService.deleteBmiRecord(String(req.params.id), req.userId!);
    sendSuccess(res, null, "Registro eliminado");
  } catch (error: any) {
    if (error.message.includes("no encontrado")) {
      sendError(res, "NOT_FOUND", error.message, 404);
    } else {
      sendError(res, "INTERNAL_ERROR", error.message, 500);
    }
  }
};
