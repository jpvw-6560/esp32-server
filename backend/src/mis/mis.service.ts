import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mis } from '../entities/mis.entity';

@Injectable()
export class MisService {
  constructor(
    @InjectRepository(Mis)
    private readonly misRepository: Repository<Mis>,
  ) {}

  findAll(): Promise<Mis[]> {
    return this.misRepository.find();
  }

  findOne(id: number): Promise<Mis> {
    return this.misRepository.findOneBy({ id });
  }

  create(mis: Partial<Mis>): Promise<Mis> {
    return this.misRepository.save(mis);
  }

  update(id: number, mis: Partial<Mis>): Promise<any> {
    return this.misRepository.update(id, mis);
  }

  remove(id: number): Promise<any> {
    return this.misRepository.delete(id);
  }
}
