import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdressService } from './adress.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { SpecialtyService } from './specialty.service';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    private readonly adressService: AdressService,
    private readonly specialtyService: SpecialtyService,
  ) {}

  async create({
    cep,
    name,
    cellphone,
    crm,
    phone,
    specialties,
  }: CreateDoctorDto): Promise<Doctor> {
    const adress_id = await this.adressService.findId(cep);
    const newdoctor = this.doctorsRepository.create({
      name,
      cellphone,
      crm,
      phone,
      adress_id,
    });
    await this.specialtyService.validateSpecialty(specialties);
    const savedDoctor = await this.doctorsRepository.save(newdoctor);
    await Promise.all(
      specialties.map(async (item) => {
        const id = await this.specialtyService.findId(item);
        await this.specialtyService.createRelation(id, savedDoctor.id);
      }),
    );
    const doctor = this.doctorsRepository.findOne(
      { crm },
      { relations: ['adress', 'specialties'] },
    );
    return doctor;
  }

  findOne(id: number) {
    return this.doctorsRepository.findOneOrFail(id, {
      relations: ['adress', 'specialties'],
    });
  }

  async findMany(queryItems) {
    const { limit, skip, crm, phone, cep, cellphone, ...query } = queryItems;

    const queryBuilder = this.doctorsRepository
      .createQueryBuilder('doctor')
      .select([
        'doctor.name as name',
        'doctor.crm as crm',
        'doctor.phone as phone',
        'doctor.cellphone as cellphone',
        'adress.street as street',
        'adress.city as city',
        'adress.district ',
        'adress.state as state',
        'adress.cep as cep',
      ])
      .leftJoin('doctor.adress', 'adress');
    if (crm) {
      queryBuilder.andWhere(`crm='${crm}'`);
    }
    if (phone) {
      queryBuilder.andWhere(`phone='${phone}'`);
    }
    if (cellphone) {
      queryBuilder.andWhere(`cellphone='${cellphone}'`);
    }
    if (cep) {
      queryBuilder.andWhere(`cep='${cep}'`);
    }
    Object.keys(query).map(function (key) {
      queryBuilder.andWhere(`${key} like '%${query[key]}%'`);
    });

    queryBuilder.skip(skip || 0).limit(limit || 10);
    return await queryBuilder.execute();
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    await this.doctorsRepository.findOneOrFail(id);
    const { specialties, ...user } = updateDoctorDto;
    if (specialties) {
      await this.specialtyService.deleteRelation(id);
      specialties.map(async (item) => {
        const specialty = await this.specialtyService.findId(item);
        if (!specialty) {
          await this.specialtyService.createRelation(specialty, id);
        }
      });
    }
    return this.doctorsRepository.update(id, user);
  }

  async remove(id: number) {
    await this.doctorsRepository.findOneOrFail(id);
    await this.doctorsRepository.softDelete(id);
    return this.doctorsRepository.findOne(id);
  }
}
