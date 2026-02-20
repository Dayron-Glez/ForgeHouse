import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { sendError } from "../utils/api-response.utils";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      sendError(res, "VALIDATION_ERROR", "Datos inválidos", 400, details);
      return;
    }

    req.body = result.data;
    next();
  };
