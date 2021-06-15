import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(name: string): Promise<Specialty> {
    const specialty = this.specialtyRepository.create({ specialty: name });
    return this.specialtyRepository.save(specialty);
  }

  async findId(specialtyName: string): Promise<number> {
    const specialty = await this.specialtyRepository.findOne({
      specialty: specialtyName,
    });
    if (!specialty) {
      throw new HttpException('specialty not exits', HttpStatus.NOT_FOUND);
    }
    return specialty.id;
  }
  async validateSpecialty(specialties: string[]) {
    specialties.map(
      async (item) =>
        await this.specialtyRepository.findOneOrFail({ specialty: item }),
    );
  }

  async createRelation(specialty_id: number, doctor_id: number) {
    const relation = this.specialtyDoctorRepository.create({
      specialty_id,
      doctor_id,
    });
    await this.specialtyDoctorRepository.save(relation);
  }

  async deleteRelation(doctor_id: number) {
    await this.specialtyDoctorRepository.delete({
      doctor_id,
    });
  }
}
