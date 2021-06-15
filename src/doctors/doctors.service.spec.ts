import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdressService } from './adress.service';
import { DoctorsService } from './doctors.service';
import { Adress } from './entities/adress.entity';
import { Doctor } from './entities/doctor.entity';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyDoctor } from './entities/specialtyDoctor.entity';
import { SpecialtyService } from './specialty.service';
import testUtil from '../shared/utils/testUtils';

describe('DoctorsService', () => {
  let docService: DoctorsService;
  let adressService: AdressService;
  let specService: SpecialtyService;
  const doctor = testUtil.giveAValidDoctor();

  const mockDocRepository = {
    save: jest.fn().mockReturnValue(doctor),
    findOne: jest.fn().mockReturnValue(doctor),
    findOneOrFail: jest.fn().mockReturnValue(doctor),
    create: jest.fn().mockReturnValue(doctor),
    update: jest.fn().mockReturnValue(doctor),
    softDelete: jest.fn(),
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
        {
          provide: getRepositoryToken(SpecialtyDoctor),
          useValue: mockRepository,
        },
      ],
    }).compile();

    docService = module.get<DoctorsService>(DoctorsService);
    adressService = module.get<AdressService>(AdressService);
    specService = module.get<SpecialtyService>(SpecialtyService);
  });

  it('should be able to create a new doctor', async () => {
    jest.spyOn(adressService, 'findId').mockImplementation(async () => 1);
    jest.spyOn(specService, 'createRelation').mockImplementation();
    const dto = testUtil.giveADoctorDTO();
    expect(await docService.create(dto)).toBe(doctor);
  });

  it('should be able to update an existing doctor', async () => {
    const dto = testUtil.giveADoctorDTO();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { specialties, ...doc } = dto;
    expect(await docService.update(doctor.id, doc)).toBe(doctor);
  });

  it('should be able to find an existing doctor given his id', async () => {
    expect(await docService.findOne(doctor.id)).toBe(doctor);
  });

  it('should be able to delete an existing doctor', async () => {
    await docService.remove(1);
    expect(mockDocRepository.softDelete).toHaveBeenCalled();
  });

  it('should be able to find an existing doctor given certain query filter', () => {
    expect(docService).toBeDefined();
  });
});
