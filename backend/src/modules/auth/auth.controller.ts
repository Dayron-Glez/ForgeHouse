import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { sendSuccess, sendError } from "../../utils/api-response.utils";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.register(req.body);
    sendSuccess(res, result, "Registro exitoso", 201);
  } catch (error: any) {
    if (error.message === "El email ya está registrado") {
      sendError(res, "CONFLICT", error.message, 409);
    } else {
      sendError(res, "INTERNAL_ERROR", error.message, 500);
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    sendSuccess(res, result, "Inicio de sesión exitoso");
  } catch (error: any) {
    sendError(res, "UNAUTHORIZED", error.message, 401);
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);
    sendSuccess(res, result, "Token renovado");
  } catch (error: any) {
    sendError(res, "UNAUTHORIZED", error.message, 401);
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    await authService.logout(req.userId!);
    sendSuccess(res, null, "Sesión cerrada");
  } catch (error: any) {
    sendError(res, "INTERNAL_ERROR", error.message, 500);
  }
};
