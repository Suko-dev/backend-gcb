import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { Doctor } from './entities/doctor.entity';
import { Specialty } from './entities/specialty.entity';
import { AdressService } from './adress.service';
import { SpecialtyService } from './specialty.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adress, Doctor, Specialty])],
  controllers: [DoctorsController],
  providers: [DoctorsService, AdressService, SpecialtyService],
})
export class DoctorsModule {}
