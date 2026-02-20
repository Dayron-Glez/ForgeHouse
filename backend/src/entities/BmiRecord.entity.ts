import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity("bmi_records")
export class BmiRecord {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  weight!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  height!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  bmiValue!: number;

  @Column({ type: "varchar", length: 30 })
  category!: string;

  @ManyToOne(() => User, (user) => user.bmiRecords, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ type: "uuid" })
  userId!: string;

  @CreateDateColumn()
  recordedAt!: Date;
}
