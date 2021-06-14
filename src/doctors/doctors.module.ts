import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';
import { Doctor } from './entities/doctor.entity';
import { SpecialtyDoctor } from './entities/specialtyDoctor.entity';
import { Specialty } from './entities/specialty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Adress, Doctor, SpecialtyDoctor, Specialty]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
