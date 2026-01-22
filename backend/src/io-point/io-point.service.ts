import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IoPointEntity } from './io-point.entity';

@Injectable()
export class IoPointService {
  constructor(
    @InjectRepository(IoPointEntity)
    private readonly ioPointRepository: Repository<IoPointEntity>,
  ) {}

  findAll(): Promise<IoPointEntity[]> {
    return this.ioPointRepository.find();
  }

  findOne(id: number): Promise<IoPointEntity | null> {
    return this.ioPointRepository.findOneBy({ id });
  }

  create(ioPoint: Partial<IoPointEntity>): Promise<IoPointEntity> {
    const entity = this.ioPointRepository.create(ioPoint);
    return this.ioPointRepository.save(entity);
  }
}
