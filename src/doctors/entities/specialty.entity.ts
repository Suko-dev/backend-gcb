import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity('specialties')
export class Specialty {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  specialty: string;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: 'specialtiesdoctors',
    joinColumns: [{ name: 'specialty_id' }],
    inverseJoinColumns: [{ name: 'doctor_id' }],
  })
  doctors: Doctor[];
}
