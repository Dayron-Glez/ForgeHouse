import api from "@/lib/axios";
import type {
  BmiRecord,
  CalculateBmiRequest,
  ApiResponse,
} from "@forgehouse/shared";

export const bmiService = {
  getHistory: () => api.get<ApiResponse<BmiRecord[]>>("/bmi"),

  calculate: (data: CalculateBmiRequest): Promise<ApiResponse<BmiRecord>> =>
    api.post<ApiResponse<BmiRecord>>("/bmi", data).then((res) => res.data),

  deleteRecord: (id: string) => api.delete<ApiResponse<null>>(`/bmi/${id}`),
};
