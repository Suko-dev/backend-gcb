import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Adress } from './adress.entity';
import { Specialty } from './specialty.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 7 })
  crm: number;

  @Column()
  phone: number;

  @Column()
  cellphone: number;

  @ManyToOne(() => Adress)
  @JoinColumn({ name: 'adress_id' })
  adress: Adress;

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: 'SpecialtiesDoctors',
    joinColumns: [{ name: 'doctor_id' }],
    inverseJoinColumns: [{ name: 'specialty_id' }],
  })
  specialties: Specialty[];

  @Column()
  specitaly_id: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
