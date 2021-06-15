import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdressService } from './adress.service';
import { DoctorsService } from './doctors.service';
import { Adress } from './entities/adress.entity';
import { Doctor } from './entities/doctor.entity';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialty.service';
import testUtil from '../shared/utils/testUtils';

describe('SpecialtyService', () => {
  let specService: SpecialtyService;
  const specialty = testUtil.giveAValidSpecialty();

  const mockRepository = {};

  const mockSpecRepository = {
    create: jest.fn(),
    save: jest.fn().mockReturnValue(specialty),
    findOne: jest.fn().mockReturnValue(specialty),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        AdressService,
        SpecialtyService,
        { provide: getRepositoryToken(Doctor), useValue: mockRepository },
        { provide: getRepositoryToken(Adress), useValue: mockRepository },
        {
          provide: getRepositoryToken(Specialty),
          useValue: mockSpecRepository,
        },
      ],
    }).compile();

    specService = module.get<SpecialtyService>(SpecialtyService);
  });

  it('should be able to create a new specialty', async () => {
    expect(await specService.create('teste')).toBe(specialty);
  });

  it('should be able to transform a string in a array of specialties', async () => {
    expect(await specService.getSpecialties(['teste'])).toEqual(
      expect.any(Array),
    );
  });
});
