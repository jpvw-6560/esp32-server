import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { EventLogEntity } from './event-log.entity';

@Controller('event-logs')
export class EventLogController {
  constructor(private readonly eventLogService: EventLogService) {}

  @Get()
  async findAll(): Promise<EventLogEntity[]> {
    return this.eventLogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventLogEntity | null> {
    return this.eventLogService.findOne(Number(id));
  }

  @Post()
  async create(@Body() eventLog: Partial<EventLogEntity>): Promise<EventLogEntity> {
    return this.eventLogService.create(eventLog);
  }
}
