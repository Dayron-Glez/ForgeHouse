import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import {
  sendSuccess,
  sendPaginated,
  sendError,
} from "../../utils/api-response.utils";
import * as exerciseService from "./exercise.service";

export const getExercises = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { muscleGroup, difficulty, page, limit } = req.query;
    const result = await exerciseService.getExercises({
      muscleGroup: muscleGroup as string,
      difficulty: difficulty as string,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });
    sendPaginated(
      res,
      result.exercises,
      result.total,
      result.page,
      result.limit,
    );
  } catch (error: any) {
    sendError(res, "INTERNAL_ERROR", error.message, 500);
  }
};

export const getExerciseById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const exercise = await exerciseService.getExerciseById(
      String(req.params.id),
    );
    sendSuccess(res, exercise);
  } catch (error: any) {
    sendError(res, "NOT_FOUND", error.message, 404);
  }
};
