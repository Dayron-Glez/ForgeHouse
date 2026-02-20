import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";
import { sendError } from "../utils/api-response.utils";

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    sendError(res, "UNAUTHORIZED", "Token de acceso requerido", 401);
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    req.userEmail = payload.email;
    next();
  } catch {
    sendError(res, "UNAUTHORIZED", "Token inválido o expirado", 401);
  }
};
