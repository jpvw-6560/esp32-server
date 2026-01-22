import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { EventLogEntity } from './event-log.entity';

@Controller('event-logs')
export class EventLogController {
  constructor(private readonly eventLogService: EventLogService) {}

  @Get()
  async findAll(
    @Query('device_name') deviceName?: string,
    @Query('symbolic_name') symbolicName?: string,
    @Query('date_debut') dateDebut?: string,
    @Query('date_fin') dateFin?: string,
  ): Promise<EventLogEntity[]> {
    return this.eventLogService.findAllFiltered(deviceName, symbolicName, dateDebut, dateFin);
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
