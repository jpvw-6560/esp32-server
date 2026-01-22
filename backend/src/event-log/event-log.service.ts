import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventLogEntity } from './event-log.entity';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLogEntity)
    private readonly eventLogRepository: Repository<EventLogEntity>,
  ) {}

  findAll(): Promise<EventLogEntity[]> {
    return this.eventLogRepository.find({ order: { triggeredAt: 'DESC' } });
  }

  findOne(id: number): Promise<EventLogEntity | null> {
    return this.eventLogRepository.findOneBy({ id });
  }

  create(eventLog: Partial<EventLogEntity>): Promise<EventLogEntity> {
    const entity = this.eventLogRepository.create(eventLog);
    return this.eventLogRepository.save(entity);
  }
}
