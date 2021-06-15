import { Adress } from '../../doctors/entities/adress.entity';
import { CreateDoctorDto } from '../../doctors/dto/create-doctor.dto';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Specialty } from '../../doctors/entities/specialty.entity';

export default class testUtil {
  static giveAValidDoctor(): Doctor {
    const doctor = new Doctor();
    doctor.id = 1;
    doctor.cellphone = 1;
    doctor.created_at = new Date();
    doctor.crm = 1;
    doctor.deleted_at = null;
    doctor.name = 'ze';
    doctor.phone = 1;
    doctor.updated_at = new Date();
    return doctor;
  }
  static giveAValidSpecialty(): Specialty {
    const specialty = new Specialty();
    specialty.id = 1;
    specialty.specialty = 'a';
    specialty.created_at = new Date();
    specialty.updated_at = new Date();
    return specialty;
  }

  static giveADoctorDTO(): CreateDoctorDto {
    const doctor = new CreateDoctorDto();
    doctor.cellphone = 11;
    doctor.crm = 1;
    doctor.name = 'ze';
    doctor.phone = 1;
    doctor.cep = 3630000;
    doctor.specialties = ['a', 'b'];
    return doctor;
  }
  static giveAValidAdress(): Adress {
    const adress = new Adress();
    adress.cep = 1;
    adress.city = 'a';
    adress.district = 'a';
    adress.id = 1;
    adress.state = 'a';
    adress.street = 'a';
    adress.updated_at = new Date();
    adress.created_at = new Date();
    return adress;
  }
}
