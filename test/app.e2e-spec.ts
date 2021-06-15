import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DoctorsModule } from '../src/doctors/doctors.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from '../src/doctors/entities/doctor.entity';
import { Adress } from '../src/doctors/entities/adress.entity';
import { Specialty } from '../src/doctors/entities/specialty.entity';
import { SpecialtyDoctor } from '../src/doctors/entities/specialtyDoctor.entity';
import testUtil from '../src/shared/utils/testUtils';

describe('DoctorController (e2e)', () => {
  let app: INestApplication;
  const docDTO = testUtil.giveADoctorDTO();
  const doctor = testUtil.giveAValidDoctor();
  const adress = testUtil.giveAValidAdress();
  const specialty = testUtil.giveAValidSpecialty();
  const docResponse = {
    cellphone: 1,
    crm: 1,
    deleted_at: null,
    name: 'ze',
    phone: 1,
    created_at: expect.any(String),
    updated_at: expect.any(String),
  };

  const mockDocRepository = {
    save: jest.fn().mockReturnValue(doctor),
    findOne: jest.fn().mockReturnValue(doctor),
    findOneOrFail: jest.fn().mockReturnValue(doctor),
    create: jest.fn().mockReturnValue(doctor),
    update: jest.fn().mockReturnValue(doctor),
    softDelete: jest.fn(),
  };
  const mockAdressRepository = {
    create: jest.fn(),
    save: jest.fn().mockReturnValue(adress),
    findOne: jest.fn().mockReturnValue(adress),
  };
  const mockSpecialtyRepository = {
    create: jest.fn().mockReturnValue(specialty),
    save: jest.fn().mockReturnValue(specialty),
    findOne: jest.fn().mockReturnValue(specialty),
  };
  const mockRelationRepository = {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DoctorsModule],
    })
      .overrideProvider(getRepositoryToken(Doctor))
      .useValue(mockDocRepository)
      .overrideProvider(getRepositoryToken(Adress))
      .useValue(mockAdressRepository)
      .overrideProvider(getRepositoryToken(Specialty))
      .useValue(mockSpecialtyRepository)
      .overrideProvider(getRepositoryToken(SpecialtyDoctor))
      .useValue(mockRelationRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/doctors (POST)', () => {
    return request(app.getHttpServer())
      .post('/doctors')
      .send(docDTO)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(docResponse);
      });
  });

  it('/doctors/id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/doctors/1')
      .send(docDTO)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(docResponse);
      });
  });

  it('/doctors/id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/doctors/1')
      .expect(200)
      .expect(`doctor with id: 1 was removed from database`);
  });

  it('/doctors/id (GET)', () => {
    return request(app.getHttpServer())
      .get('/doctors/1')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(docResponse);
      });
  });
});
