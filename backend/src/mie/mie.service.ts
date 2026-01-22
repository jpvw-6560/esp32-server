import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mie } from '../entities/mie.entity';

@Injectable()
export class MieService {
  constructor(
    @InjectRepository(Mie)
    private readonly mieRepository: Repository<Mie>,
  ) {}

  findAll(): Promise<Mie[]> {
    return this.mieRepository.find();
  }

  findOne(id: number): Promise<Mie> {
    return this.mieRepository.findOneBy({ id });
  }

  create(mie: Partial<Mie>): Promise<Mie> {
    return this.mieRepository.save(mie);
  }

  update(id: number, mie: Partial<Mie>): Promise<any> {
    return this.mieRepository.update(id, mie);
  }

  remove(id: number): Promise<any> {
    return this.mieRepository.delete(id);
  }
}
