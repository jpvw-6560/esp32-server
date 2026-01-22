import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IoPointService } from './io-point.service';
import { IoPointEntity } from './io-point.entity';

@Controller('io-points')
export class IoPointController {
  constructor(private readonly ioPointService: IoPointService) {}

  @Get()
  async findAll(): Promise<IoPointEntity[]> {
    return this.ioPointService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IoPointEntity | null> {
    return this.ioPointService.findOne(Number(id));
  }

  @Post()
  async create(@Body() ioPoint: Partial<IoPointEntity>): Promise<IoPointEntity> {
    return this.ioPointService.create(ioPoint);
  }
}
