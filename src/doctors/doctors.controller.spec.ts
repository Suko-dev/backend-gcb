import { Test, TestingModule } from '@nestjs/testing';
import testUtil from '../shared/utils/testUtils';
import { AdressService } from './adress.service';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { SpecialtyService } from './specialty.service';

describe('DoctorsController', () => {
  let controller: DoctorsController;
  const dto = testUtil.giveADoctorDTO();

  const mockDoctorService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    findOne: jest.fn((id) => {
      return {
        id,
      };
    }),
    remove: jest.fn(),
    findMany: jest.fn((query) => {
      const queryItems = Object.keys(query).map((key) => {
        return key;
      });
      return queryItems;
    }),
  };
  const mockAdressService = {};
  const mockSpecialtyService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [DoctorsService, AdressService, SpecialtyService],
    })
      .overrideProvider(DoctorsService)
      .useValue(mockDoctorService)
      .overrideProvider(AdressService)
      .useValue(mockAdressService)
      .overrideProvider(SpecialtyService)
      .useValue(mockSpecialtyService)
      .compile();

    controller = module.get<DoctorsController>(DoctorsController);
  });

  it('should be able to create a doctor', async () => {
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockDoctorService.create).toHaveBeenCalled();
  });

  it('should be able to get a doctor given his id', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: 1,
    });
    expect(mockDoctorService.findOne).toHaveBeenCalled();
  });

  it('should be able to update a doctor', async () => {
    expect(await controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
    });
    expect(mockDoctorService.update).toHaveBeenCalled();
  });

  it('should be able to delete a doctor', async () => {
    await controller.remove('teste');
    expect(mockDoctorService.remove).toHaveBeenCalled();
  });

  it('should be able to get a doctor given certain query filters', async () => {
    const query = { limit: 1, name: 'ze' };
    const queryResult = controller.findMany(query);
    expect(queryResult).toEqual(['limit', 'name']);
  });
});
