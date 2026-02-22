import api from "@/lib/axios";
import type {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  ApiResponse,
} from "@forgehouse/shared";

export const appointmentService = {
  getAppointments: (params?: {
    month?: string;
    status?: string;
  }): Promise<ApiResponse<Appointment[]>> =>
    api
      .get<ApiResponse<Appointment[]>>("/appointments", { params })
      .then((res) => res.data),

  getAppointmentById: (id: string): Promise<ApiResponse<Appointment>> =>
    api
      .get<ApiResponse<Appointment>>(`/appointments/${id}`)
      .then((res) => res.data),

  createAppointment: (
    data: CreateAppointmentRequest,
  ): Promise<ApiResponse<Appointment>> =>
    api
      .post<ApiResponse<Appointment>>("/appointments", data)
      .then((res) => res.data),

  updateAppointment: (
    id: string,
    data: UpdateAppointmentRequest,
  ): Promise<ApiResponse<Appointment>> =>
    api
      .patch<ApiResponse<Appointment>>(`/appointments/${id}`, data)
      .then((res) => res.data),

  cancelAppointment: (id: string): Promise<ApiResponse<Appointment>> =>
    api
      .patch<ApiResponse<Appointment>>(`/appointments/${id}/cancel`)
      .then((res) => res.data),
};
