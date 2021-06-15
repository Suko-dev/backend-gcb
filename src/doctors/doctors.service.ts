import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdressService } from './adress.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { QueryDoctorDto } from './dto/query-doctor.dto';
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
    const adress = await this.adressService.findByCep(cep);
    const doctor = this.doctorsRepository.create({
      name,
      cellphone,
      crm,
      phone,
    });
    doctor.adress = adress;
    doctor.specialties = await this.specialtyService.getSpecialties(
      specialties,
    );
    const savedDoctor = await this.doctorsRepository.save(doctor);
    return savedDoctor;
  }

  async findOne(id: number) {
    return await this.doctorsRepository.findOneOrFail(id, {
      relations: ['adress', 'specialties'],
    });
  }

  async findMany(queryItems: QueryDoctorDto) {
    const {
      limit,
      skip,
      crm,
      phone,
      cep,
      cellphone,
      specialty,
      name,
      ...adressQuery
    } = queryItems;

    const queryBuilder = this.doctorsRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.specialties', 'special')
      .leftJoinAndSelect('doctor.adress', 'adress');
    if (crm) {
      queryBuilder.andWhere(`doctor.crm='${crm}'`);
    }
    if (phone) {
      queryBuilder.andWhere(`doctor.phone='${phone}'`);
    }
    if (cellphone) {
      queryBuilder.andWhere(`doctor.cellphone='${cellphone}'`);
    }
    if (name) {
      queryBuilder.andWhere(`doctor.name like '%${name}%'`);
    }
    if (cep) {
      queryBuilder.andWhere(`adress.cep='${cep}'`);
    }
    if (specialty) {
      queryBuilder.andWhere(`special.specialty like '%${specialty}%'`);
    }
    Object.keys(adressQuery).map(function (key) {
      queryBuilder.andWhere(`adress.${key} like '%${adressQuery[key]}%'`);
    });

    queryBuilder.skip(skip || 0).take(limit || 10);
    return await queryBuilder.getMany();
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    await this.doctorsRepository.findOneOrFail(id);
    const { specialties, ...user } = updateDoctorDto;
    if (specialties) {
      const newSpecialty = await this.specialtyService.getSpecialties(
        specialties,
      );
      Object.assign(user, newSpecialty);
    }
    return this.doctorsRepository.update(id, user);
  }

  async remove(id: number) {
    await this.doctorsRepository.findOneOrFail(id);
    await this.doctorsRepository.softDelete(id);
  }
}
