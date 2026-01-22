import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { EventEntity } from './event.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(): Promise<EventEntity[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventEntity | null> {
    return this.eventService.findOne(Number(id));
  }

  @Post()
  async create(@Body() event: Partial<EventEntity>): Promise<EventEntity> {
    return this.eventService.create(event);
  }
}
