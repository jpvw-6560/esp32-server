import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IoHistoryEntity } from './io-history.entity';

@Injectable()
export class IoHistoryService {
  constructor(
    @InjectRepository(IoHistoryEntity)
    private readonly ioHistoryRepository: Repository<IoHistoryEntity>,
  ) {}

  findAll(): Promise<IoHistoryEntity[]> {
    return this.ioHistoryRepository.find({ order: { recordedAt: 'DESC' } });
  }

  findOne(id: number): Promise<IoHistoryEntity | null> {
    return this.ioHistoryRepository.findOneBy({ id });
  }

  create(ioHistory: Partial<IoHistoryEntity>): Promise<IoHistoryEntity> {
    const entity = this.ioHistoryRepository.create(ioHistory);
    return this.ioHistoryRepository.save(entity);
  }
}
