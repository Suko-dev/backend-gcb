import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { QueryDoctorDto } from './dto/query-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Get()
  findMany(@Query() query: QueryDoctorDto) {
    return this.doctorsService.findMany(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.doctorsService.remove(+id);
    return `doctor with id: ${id} was removed from database`;
  }
}
