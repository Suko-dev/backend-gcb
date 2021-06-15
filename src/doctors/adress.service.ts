import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import getCep from 'src/shared/utils/getCep';
import { Repository } from 'typeorm';
import { CreateAdressDto } from './dto/create-adress.dto';
import { Adress } from './entities/adress.entity';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(Adress)
    private adressRepository: Repository<Adress>,
  ) {}

  async create(adress: CreateAdressDto): Promise<Adress> {
    const newAdress = this.adressRepository.create(adress);
    return this.adressRepository.save(newAdress);
  }

  async findId(cep: number): Promise<number> {
    let adress = await this.adressRepository.findOne({ cep });
    if (!adress) {
      const { bairro, logradouro, localidade, uf } = await getCep(cep);
      adress = await this.create({
        cep,
        district: bairro,
        city: localidade,
        street: logradouro,
        state: uf,
      });
    }
    return adress.id;
  }
}
