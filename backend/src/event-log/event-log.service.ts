import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { EventLogEntity } from './event-log.entity';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLogEntity)
    private readonly eventLogRepository: Repository<EventLogEntity>,
  ) {}


  findAllFiltered(
    deviceName?: string,
    symbolicName?: string,
    dateDebut?: string,
    dateFin?: string,
  ): Promise<EventLogEntity[]> {
    const where: any = {};
    if (deviceName) where.deviceName = deviceName;
    if (symbolicName) where.symbolicName = symbolicName;
    if (dateDebut && dateFin) {
      where.triggeredAt = Between(dateDebut, dateFin);
    } else if (dateDebut) {
      where.triggeredAt = MoreThanOrEqual(dateDebut);
    } else if (dateFin) {
      where.triggeredAt = LessThanOrEqual(dateFin);
    }
    return this.eventLogRepository.find({
      where,
      order: { triggeredAt: 'DESC' },
    });
  }

  findOne(id: number): Promise<EventLogEntity | null> {
    return this.eventLogRepository.findOneBy({ id });
  }

  create(eventLog: Partial<EventLogEntity>): Promise<EventLogEntity> {
    const entity = this.eventLogRepository.create(eventLog);
    return this.eventLogRepository.save(entity);
  }
}
