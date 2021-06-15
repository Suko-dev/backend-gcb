import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyDoctor } from './entities/specialtyDoctor.entity';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
    @InjectRepository(SpecialtyDoctor)
    private specialtyDoctorRepository: Repository<SpecialtyDoctor>,
  ) {}

  async create(specialty: string): Promise<Specialty> {
    const newspecialty = this.specialtyRepository.create({ specialty });
    return this.specialtyRepository.save(newspecialty);
  }

  async findId(specialtyName: string): Promise<number> {
    const specialty = await this.specialtyRepository.findOne({
      specialty: specialtyName,
    });
    if (!specialty) {
      return undefined;
    }
    return specialty.id;
  }

  async createRelation(specialties: string[], doctor_id: number) {
    let relation;
    await Promise.all(
      specialties.map(async (item) => {
        let specialty_id = await this.findId(item);
        if (!specialty_id) {
          const { id } = await this.create(item);
          specialty_id = id;
        }
        relation = this.specialtyDoctorRepository.create({
          specialty_id,
          doctor_id,
        });
      }),
    );
    await this.specialtyDoctorRepository.save(relation);
  }

  async deleteRelation(doctor_id: number) {
    await this.specialtyDoctorRepository.delete({
      doctor_id,
    });
  }
}
