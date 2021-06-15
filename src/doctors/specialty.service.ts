import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}

  async create(specialty: string): Promise<Specialty> {
    const newspecialty = this.specialtyRepository.create({ specialty });
    return this.specialtyRepository.save(newspecialty);
  }

  async getSpecialties(specialties: string[]): Promise<Specialty[]> {
    return await Promise.all(
      specialties.map(async (item) => {
        let specialty = await this.specialtyRepository.findOne({
          specialty: item,
        });
        if (!specialty) {
          specialty = await this.create(item);
        }
        return specialty;
      }),
    );
  }
}
