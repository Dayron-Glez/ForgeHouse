import { AppDataSource } from "../../config/database";
import { BmiRecord } from "../../entities/BmiRecord.entity";

const bmiRepository = AppDataSource.getRepository(BmiRecord);

function calculateBmiValue(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return parseFloat((weight / (heightM * heightM)).toFixed(2));
}

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

export const calculateBmi = async (
  userId: string,
  data: { weight: number; height: number },
): Promise<BmiRecord> => {
  const bmiValue = calculateBmiValue(data.weight, data.height);
  const category = getBmiCategory(bmiValue);

  const record = bmiRepository.create({
    weight: data.weight,
    height: data.height,
    bmiValue,
    category,
    userId,
  });

  await bmiRepository.save(record);
  return record;
};

export const getBmiHistory = async (userId: string): Promise<BmiRecord[]> => {
  return bmiRepository.find({
    where: { userId },
    order: { recordedAt: "DESC" },
  });
};

export const deleteBmiRecord = async (
  id: string,
  userId: string,
): Promise<void> => {
  const record = await bmiRepository.findOne({ where: { id, userId } });
  if (!record) throw new Error("Registro no encontrado");
  await bmiRepository.remove(record);
};
