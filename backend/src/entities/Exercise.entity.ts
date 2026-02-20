import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Appointment } from "./Appointment.entity";

@Entity("exercises")
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "varchar", length: 30 })
  muscleGroup!: string;

  @Column({ type: "varchar", nullable: true })
  imageUrl!: string | null;

  @Column({ type: "varchar", length: 50, default: "beginner" })
  difficulty!: "beginner" | "intermediate" | "advanced";

  @OneToMany(() => Appointment, (appointment) => appointment.exercise)
  appointments!: Appointment[];
}
