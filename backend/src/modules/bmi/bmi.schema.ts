import { z } from "zod";

export const calculateBmiSchema = z.object({
  weight: z.number().positive("El peso debe ser mayor a 0").max(500),
  height: z.number().positive("La altura debe ser mayor a 0").max(300),
});
