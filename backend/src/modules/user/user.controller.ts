import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { sendSuccess, sendError } from "../../utils/api-response.utils";
import * as userService from "./user.service";

export const getProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const profile = await userService.getProfile(req.userId!);
    sendSuccess(res, profile);
  } catch (error: any) {
    sendError(res, "NOT_FOUND", error.message, 404);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const profile = await userService.updateProfile(req.userId!, req.body);
    sendSuccess(res, profile, "Perfil actualizado");
  } catch (error: any) {
    sendError(res, "INTERNAL_ERROR", error.message, 500);
  }
};

export const uploadAvatar = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      sendError(res, "VALIDATION_ERROR", "No se proporcionó imagen", 400);
      return;
    }
    const profile = await userService.uploadAvatar(req.userId!, req.file.path);
    sendSuccess(res, profile, "Avatar actualizado");
  } catch (error: any) {
    sendError(res, "INTERNAL_ERROR", error.message, 500);
  }
};

export const removeAvatar = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const profile = await userService.removeAvatar(req.userId!);
    sendSuccess(res, profile, "Avatar eliminado");
  } catch (error: any) {
    sendError(res, "INTERNAL_ERROR", error.message, 500);
  }
};
