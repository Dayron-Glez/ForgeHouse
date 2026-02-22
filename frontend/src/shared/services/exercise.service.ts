import api from "@/lib/axios";
import type { Exercise, PaginatedResponse } from "@forgehouse/shared";

export const exerciseService = {
  getExercises: (params?: {
    muscleGroup?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }) => api.get<PaginatedResponse<Exercise>>("/exercises", { params }),

  getExerciseById: (id: string) =>
    api.get<{ success: boolean; data: Exercise }>(`/exercises/${id}`),
};
