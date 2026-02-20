import type { BmiCategory } from "../enums";

export interface BmiRecord {
  id: string;
  weight: number;
  height: number;
  bmiValue: number;
  category: BmiCategory;
  userId: string;
  recordedAt: string;
}

export interface CalculateBmiRequest {
  weight: number;
  height: number;
}
