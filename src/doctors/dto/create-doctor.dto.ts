import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ example: 'cleyton' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 120)
  name: string;

  @ApiProperty({ example: 1234567 })
  @IsNotEmpty()
  @Max(9999999)
  @IsInt()
  crm: number;

  @ApiProperty({ example: 36038030 })
  @IsNotEmpty()
  @IsInt()
  cep: number;

  @ApiProperty({ example: 3230003000 })
  @IsNotEmpty()
  @IsInt()
  phone: number;

  @ApiProperty({ example: 32988888888 })
  @IsNotEmpty()
  @IsInt()
  cellphone: number;

  @ApiProperty({ example: ['Buco maxilo', 'Cardiologia infantil'] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  specialties: string[];
}
