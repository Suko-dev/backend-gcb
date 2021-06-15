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

describe('SpecialtyService', () => {
  let specService: SpecialtyService;
  const specialty = testUtil.giveAValidSpecialty();

  const mockRepository = {};

  const mockSpecRepository = {
    create: jest.fn(),
    save: jest.fn().mockReturnValue(specialty),
    findOne: jest.fn().mockReturnValue(specialty),
  };
  const mockRelationRepository = {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
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
        {
          provide: getRepositoryToken(SpecialtyDoctor),
          useValue: mockRelationRepository,
        },
      ],
    }).compile();

    specService = module.get<SpecialtyService>(SpecialtyService);
  });

  it('should be able to create a new specialty', async () => {
    expect(await specService.create('teste')).toBe(specialty);
  });

  it('should be able to find an existing specialty id given its name', async () => {
    expect(await specService.findId('teste')).toBe(specialty.id);
  });

  it('should be able to create a relation between doctor and specialty', async () => {
    await specService.createRelation(['teste'], 1);
    expect(mockRelationRepository.create).toHaveBeenCalled();
    expect(mockRelationRepository.save).toHaveBeenCalled();
  });

  it('should be able to delete a relation between doctor and its specialties', async () => {
    await specService.deleteRelation(1);
    expect(mockRelationRepository.delete).toHaveBeenCalled();
  });
});
