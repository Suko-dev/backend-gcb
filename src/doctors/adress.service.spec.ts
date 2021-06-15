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
  let adressService: AdressService;
  const adress = testUtil.giveAValidAdress();

  const mockRepository = {};

  const mockAdressRepository = {
    create: jest.fn(),
    save: jest.fn().mockReturnValue(adress),
    findOne: jest.fn().mockReturnValue(adress),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        AdressService,
        SpecialtyService,
        { provide: getRepositoryToken(Doctor), useValue: mockRepository },
        { provide: getRepositoryToken(Adress), useValue: mockAdressRepository },
        {
          provide: getRepositoryToken(Specialty),
          useValue: mockRepository,
        },
      ],
    }).compile();

    adressService = module.get<AdressService>(AdressService);
  });

  it('should be able to create a new adress', async () => {
    expect(await adressService.create(adress)).toBe(adress);
  });

  it('should be able to get an adress given its cep', async () => {
    const newAdress = await adressService.getAdress(36038030);
    expect(newAdress).toHaveProperty('bairro');
    expect(newAdress).toHaveProperty('localidade');
    expect(newAdress).toHaveProperty('logradouro');
    expect(newAdress).toHaveProperty('uf');
  });

  it('should be able to find an adress id given its cep', async () => {
    expect(await adressService.findByCep(1)).toBe(adress);
  });
});
