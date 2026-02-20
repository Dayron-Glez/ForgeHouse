import "reflect-metadata";
import { AppDataSource } from "../config/database";
import { Exercise } from "../entities/Exercise.entity";

const exercises: Array<{ name: string; description: string; muscleGroup: string; difficulty: "beginner" | "intermediate" | "advanced" }> = [
  // Chest
  { name: "Press de banca", description: "Ejercicio compuesto para pecho con barra", muscleGroup: "chest", difficulty: "intermediate" },
  { name: "Flexiones", description: "Ejercicio básico de empuje con peso corporal", muscleGroup: "chest", difficulty: "beginner" },
  { name: "Press inclinado con mancuernas", description: "Trabaja la parte superior del pecho", muscleGroup: "chest", difficulty: "intermediate" },
  // Back
  { name: "Dominadas", description: "Ejercicio de tracción con peso corporal", muscleGroup: "back", difficulty: "advanced" },
  { name: "Remo con barra", description: "Ejercicio compuesto para espalda", muscleGroup: "back", difficulty: "intermediate" },
  { name: "Jalón al pecho", description: "Ejercicio de tracción vertical en polea", muscleGroup: "back", difficulty: "beginner" },
  // Shoulders
  { name: "Press militar", description: "Press de hombros con barra de pie", muscleGroup: "shoulders", difficulty: "intermediate" },
  { name: "Elevaciones laterales", description: "Aislamiento de deltoides lateral", muscleGroup: "shoulders", difficulty: "beginner" },
  { name: "Pájaros", description: "Elevaciones posteriores para deltoides trasero", muscleGroup: "shoulders", difficulty: "beginner" },
  // Biceps
  { name: "Curl con barra", description: "Ejercicio clásico para bíceps", muscleGroup: "biceps", difficulty: "beginner" },
  { name: "Curl martillo", description: "Trabaja bíceps y braquiorradial", muscleGroup: "biceps", difficulty: "beginner" },
  { name: "Curl concentrado", description: "Aislamiento de bíceps con mancuerna", muscleGroup: "biceps", difficulty: "intermediate" },
  // Triceps
  { name: "Fondos en paralelas", description: "Ejercicio compuesto para tríceps y pecho", muscleGroup: "triceps", difficulty: "intermediate" },
  { name: "Extensión de tríceps en polea", description: "Aislamiento de tríceps", muscleGroup: "triceps", difficulty: "beginner" },
  { name: "Press francés", description: "Extensión de tríceps con barra acostado", muscleGroup: "triceps", difficulty: "intermediate" },
  // Legs
  { name: "Sentadilla", description: "Rey de los ejercicios compuestos para piernas", muscleGroup: "legs", difficulty: "intermediate" },
  { name: "Prensa de piernas", description: "Ejercicio de empuje en máquina", muscleGroup: "legs", difficulty: "beginner" },
  { name: "Extensión de cuádriceps", description: "Aislamiento de cuádriceps en máquina", muscleGroup: "legs", difficulty: "beginner" },
  { name: "Curl femoral", description: "Aislamiento de isquiotibiales", muscleGroup: "legs", difficulty: "beginner" },
  // Glutes
  { name: "Hip thrust", description: "Ejercicio principal para glúteos", muscleGroup: "glutes", difficulty: "intermediate" },
  { name: "Peso muerto rumano", description: "Trabaja glúteos e isquiotibiales", muscleGroup: "glutes", difficulty: "intermediate" },
  { name: "Sentadilla búlgara", description: "Ejercicio unilateral para glúteos y piernas", muscleGroup: "glutes", difficulty: "advanced" },
  // Abs
  { name: "Plancha", description: "Ejercicio isométrico para core", muscleGroup: "abs", difficulty: "beginner" },
  { name: "Crunch abdominal", description: "Flexión de tronco clásica", muscleGroup: "abs", difficulty: "beginner" },
  { name: "Elevación de piernas colgado", description: "Ejercicio avanzado de abdominales inferiores", muscleGroup: "abs", difficulty: "advanced" },
  // Cardio
  { name: "Cinta de correr", description: "Ejercicio cardiovascular básico", muscleGroup: "cardio", difficulty: "beginner" },
  { name: "Bicicleta estática", description: "Cardio de bajo impacto", muscleGroup: "cardio", difficulty: "beginner" },
  { name: "Saltar la cuerda", description: "Cardio de alta intensidad", muscleGroup: "cardio", difficulty: "intermediate" },
  // Full body
  { name: "Burpees", description: "Ejercicio de cuerpo completo de alta intensidad", muscleGroup: "full_body", difficulty: "intermediate" },
  { name: "Peso muerto", description: "Ejercicio compuesto que trabaja todo el cuerpo", muscleGroup: "full_body", difficulty: "advanced" },
];

async function seed() {
  await AppDataSource.initialize();
  console.log("Base de datos conectada para seed");

  const exerciseRepository = AppDataSource.getRepository(Exercise);

  const count = await exerciseRepository.count();
  if (count > 0) {
    console.log(`Ya existen ${count} ejercicios. Saltando seed.`);
    process.exit(0);
  }

  for (const exercise of exercises) {
    const entity = exerciseRepository.create(exercise);
    await exerciseRepository.save(entity);
  }

  console.log(`${exercises.length} ejercicios creados exitosamente`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error en seed:", error);
  process.exit(1);
});
