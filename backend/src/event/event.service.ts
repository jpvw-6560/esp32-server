import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number): Promise<EventEntity | null> {
    return this.eventRepository.findOneBy({ id });
  }

  create(event: Partial<EventEntity>): Promise<EventEntity> {
    const entity = this.eventRepository.create(event);
    return this.eventRepository.save(entity);
  }
}
