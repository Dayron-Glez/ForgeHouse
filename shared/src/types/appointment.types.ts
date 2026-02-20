import type { AppointmentStatus } from "../enums";
import type { Exercise } from "./exercise.types";

export interface Appointment {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string | null;
  status: AppointmentStatus;
  userId: string;
  exerciseId: string | null;
  exercise?: Exercise;
  createdAt: string;
}

export interface CreateAppointmentRequest {
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
  exerciseId?: string;
}

export interface UpdateAppointmentRequest {
  date?: string;
  startTime?: string;
  endTime?: string;
  notes?: string;
  exerciseId?: string;
}
