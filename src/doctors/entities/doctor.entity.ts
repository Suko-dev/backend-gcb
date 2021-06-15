import { Exclude } from 'class-transformer';
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

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column()
  crm: number;

  @Column()
  phone: number;

  @Column()
  cellphone: number;

  @ManyToOne(() => Adress)
  @JoinColumn({ name: 'adress_id' })
  adress: Adress;

  @Column({ select: false })
  adress_id: number;

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: 'specialtiesdoctors',
    joinColumns: [{ name: 'doctor_id' }],
    inverseJoinColumns: [{ name: 'specialty_id' }],
  })
  specialties: Specialty[];

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
