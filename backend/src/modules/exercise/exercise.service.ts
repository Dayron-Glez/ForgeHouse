import { AppDataSource } from "../../config/database";
import { Exercise } from "../../entities/Exercise.entity";

const exerciseRepository = AppDataSource.getRepository(Exercise);

export const getExercises = async (filters: {
  muscleGroup?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
}): Promise<{
  exercises: Exercise[];
  total: number;
  page: number;
  limit: number;
}> => {
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const skip = (page - 1) * limit;

  const queryBuilder = exerciseRepository.createQueryBuilder("exercise");

  if (filters.muscleGroup) {
    queryBuilder.andWhere("exercise.muscleGroup = :muscleGroup", {
      muscleGroup: filters.muscleGroup,
    });
  }

  if (filters.difficulty) {
    queryBuilder.andWhere("exercise.difficulty = :difficulty", {
      difficulty: filters.difficulty,
    });
  }

  queryBuilder.orderBy("exercise.name", "ASC");
  queryBuilder.skip(skip).take(limit);

  const [exercises, total] = await queryBuilder.getManyAndCount();

  return { exercises, total, page, limit };
};

export const getExerciseById = async (id: string): Promise<Exercise> => {
  const exercise = await exerciseRepository.findOne({ where: { id } });
  if (!exercise) throw new Error("Ejercicio no encontrado");
  return exercise;
};
