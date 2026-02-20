import { AppDataSource } from "../../config/database";
import { Appointment } from "../../entities/Appointment.entity";

const appointmentRepository = AppDataSource.getRepository(Appointment);

export const getAppointments = async (
  userId: string,
  filters: { month?: string; status?: string },
): Promise<Appointment[]> => {
  const queryBuilder = appointmentRepository
    .createQueryBuilder("appointment")
    .leftJoinAndSelect("appointment.exercise", "exercise")
    .where("appointment.userId = :userId", { userId });

  if (filters.month) {
    // month format: "2026-02"
    queryBuilder.andWhere("TO_CHAR(appointment.date, 'YYYY-MM') = :month", {
      month: filters.month,
    });
  }

  if (filters.status) {
    queryBuilder.andWhere("appointment.status = :status", {
      status: filters.status,
    });
  }

  queryBuilder.orderBy("appointment.date", "ASC");
  queryBuilder.addOrderBy("appointment.startTime", "ASC");

  return queryBuilder.getMany();
};

export const getAppointmentById = async (
  id: string,
  userId: string,
): Promise<Appointment> => {
  const appointment = await appointmentRepository.findOne({
    where: { id, userId },
    relations: ["exercise"],
  });
  if (!appointment) throw new Error("Cita no encontrada");
  return appointment;
};

export const createAppointment = async (
  userId: string,
  data: {
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
    exerciseId?: string;
  },
): Promise<Appointment> => {
  // Check for time conflicts
  const conflict = await appointmentRepository
    .createQueryBuilder("appointment")
    .where("appointment.userId = :userId", { userId })
    .andWhere("appointment.date = :date", { date: data.date })
    .andWhere("appointment.status != :status", { status: "cancelled" })
    .andWhere(
      "(appointment.startTime < :endTime AND appointment.endTime > :startTime)",
      { startTime: data.startTime, endTime: data.endTime },
    )
    .getOne();

  if (conflict) {
    throw new Error("Ya tienes una cita programada en ese horario");
  }

  const appointment = appointmentRepository.create({
    ...data,
    userId,
  });

  await appointmentRepository.save(appointment);

  const createdAppointment = await appointmentRepository.findOne({
    where: { id: appointment.id },
    relations: ["exercise"],
  });

  if (!createdAppointment) throw new Error("Cita no encontrada");

  return createdAppointment;
};

export const updateAppointment = async (
  id: string,
  userId: string,
  data: Partial<{
    date: string;
    startTime: string;
    endTime: string;
    notes: string;
    exerciseId: string;
  }>,
) => {
  const appointment = await appointmentRepository.findOne({
    where: { id, userId },
  });

  if (!appointment) throw new Error("Cita no encontrada");
  if (appointment.status === "cancelled")
    throw new Error("No se puede editar una cita cancelada");

  // If rescheduling, check for conflicts
  if (data.date || data.startTime || data.endTime) {
    const checkDate = data.date || appointment.date;
    const checkStart = data.startTime || appointment.startTime;
    const checkEnd = data.endTime || appointment.endTime;

    const conflict = await appointmentRepository
      .createQueryBuilder("appointment")
      .where("appointment.userId = :userId", { userId })
      .andWhere("appointment.id != :id", { id })
      .andWhere("appointment.date = :date", { date: checkDate })
      .andWhere("appointment.status != :status", { status: "cancelled" })
      .andWhere(
        "(appointment.startTime < :endTime AND appointment.endTime > :startTime)",
        { startTime: checkStart, endTime: checkEnd },
      )
      .getOne();

    if (conflict) {
      throw new Error("Ya tienes una cita programada en ese horario");
    }
  }

  Object.assign(appointment, data);
  await appointmentRepository.save(appointment);

  const updatedAppointment = await appointmentRepository.findOne({
    where: { id },
    relations: ["exercise"],
  });

  if (!updatedAppointment) throw new Error("Cita no encontrada");

  return updatedAppointment;
};

export const cancelAppointment = async (id: string, userId: string) => {
  const appointment = await appointmentRepository.findOne({
    where: { id, userId },
  });

  if (!appointment) throw new Error("Cita no encontrada");
  if (appointment.status === "cancelled")
    throw new Error("La cita ya está cancelada");

  appointment.status = "cancelled";
  await appointmentRepository.save(appointment);

  const cancelledAppointment = await appointmentRepository.findOne({
    where: { id },
    relations: ["exercise"],
  });

  if (!cancelledAppointment) throw new Error("Cita no encontrada");

  return cancelledAppointment;
};
