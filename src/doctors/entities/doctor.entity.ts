import { Exclude } from 'class-transformer/';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Adress } from './adress.entity';
import { Specialty } from './specialty.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ length: 120, nullable: true })
  name: string;

  @Column()
  crm: number;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  cellphone: number;

  @ManyToOne(() => Adress)
  adress: Adress;

  @ManyToMany(() => Specialty)
  @JoinTable()
  specialties: Specialty[];

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
