import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Exercise } from "./Exercise.entity";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date" })
  date!: string;

  @Column({ type: "time" })
  startTime!: string;

  @Column({ type: "time" })
  endTime!: string;

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @Column({
    type: "varchar",
    length: 20,
    default: "scheduled",
  })
  status!: "scheduled" | "completed" | "cancelled";

  @ManyToOne(() => User, (user) => user.appointments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ type: "uuid" })
  userId!: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.appointments, {
    nullable: true,
  })
  @JoinColumn({ name: "exerciseId" })
  exercise!: Exercise | null;

  @Column({ type: "uuid", nullable: true })
  exerciseId!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}
