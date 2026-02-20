import type { MuscleGroup } from "../enums";

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  muscleGroup: MuscleGroup;
  imageUrl: string | null;
  difficulty: "beginner" | "intermediate" | "advanced";
}
