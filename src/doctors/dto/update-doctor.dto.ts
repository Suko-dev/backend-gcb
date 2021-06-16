import { PartialType } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  crm?: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  @ArrayMinSize(0)
  specialties?: string[];
}
