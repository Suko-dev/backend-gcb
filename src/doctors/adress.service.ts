import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
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

  async getAdress(cep: number) {
    const { data } = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
    return data;
  }

  async findByCep(cep: number): Promise<Adress> {
    let adress = await this.adressRepository.findOne({ cep });
    if (!adress) {
      const { bairro, logradouro, localidade, uf } = await this.getAdress(cep);
      adress = await this.create({
        cep,
        district: bairro,
        city: localidade,
        street: logradouro,
        state: uf,
      });
    }
    return adress;
  }
}
