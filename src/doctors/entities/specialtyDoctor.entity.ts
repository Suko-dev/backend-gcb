import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SpecialtyDoctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctor_id: number;

  @Column()
  specialty_id: number;
}
