import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdressService } from './adress.service';
import { DoctorsService } from './doctors.service';
import { Adress } from './entities/adress.entity';
import { Doctor } from './entities/doctor.entity';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialty.service';
import testUtil from '../shared/utils/testUtils';

describe('DoctorsService', () => {
  let docService: DoctorsService;
  let adressService: AdressService;
  let specService: SpecialtyService;
  const doctor = testUtil.giveAValidDoctor();
  const adress = testUtil.giveAValidAdress();
  const dto = testUtil.giveADoctorDTO();

  const mockDocRepository = {
    save: jest.fn().mockReturnValue(doctor),
    findOne: jest.fn().mockReturnValue(doctor),
    findOneOrFail: jest.fn().mockReturnValue(doctor),
    create: jest.fn().mockReturnValue(doctor),
    update: jest.fn().mockReturnValue(doctor),
    softDelete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue([doctor]),
    })),
  };
  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        AdressService,
        SpecialtyService,
        { provide: getRepositoryToken(Doctor), useValue: mockDocRepository },
        { provide: getRepositoryToken(Adress), useValue: mockRepository },
        {
          provide: getRepositoryToken(Specialty),
          useValue: mockRepository,
        },
      ],
    }).compile();

    docService = module.get<DoctorsService>(DoctorsService);
    adressService = module.get<AdressService>(AdressService);
    specService = module.get<SpecialtyService>(SpecialtyService);
  });

  it('should be able to create a new doctor', async () => {
    jest
      .spyOn(adressService, 'findByCep')
      .mockImplementation(async () => adress);
    jest.spyOn(specService, 'getSpecialties').mockImplementation();
    expect(await docService.create(dto)).toBe(doctor);
  });

  it('should be able to update an existing doctor', async () => {
    jest.spyOn(specService, 'getSpecialties').mockImplementation();
    expect(await docService.update(doctor.id, dto)).toBe(doctor);
  });

  it('should be able to find an existing doctor given his id', async () => {
    expect(await docService.findOne(doctor.id)).toBe(doctor);
  });

  it('should be able to delete an existing doctor', async () => {
    await docService.remove(1);
    expect(mockDocRepository.softDelete).toHaveBeenCalled();
  });

  it('should be able to find an existing doctor given certain query filter', async () => {
    expect(
      await docService.findMany({
        name: 'teste',
        crm: 'teste',
        cellphone: 'teste',
        specialty: 'a',
        cep: 'teste',
        city: 'teste',
        district: 'teste',
        limit: 1,
        phone: 'teste',
        skip: 1,
        state: 'teste',
        street: 'teste',
      }),
    ).toEqual([doctor]);
  });
});
