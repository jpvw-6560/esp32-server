import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IoHistoryService } from './io-history.service';
import { IoHistoryEntity } from './io-history.entity';

@Controller('io-history')
export class IoHistoryController {
  constructor(private readonly ioHistoryService: IoHistoryService) {}

  @Get()
  async findAll(): Promise<IoHistoryEntity[]> {
    return this.ioHistoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IoHistoryEntity | null> {
    return this.ioHistoryService.findOne(Number(id));
  }

  @Post()
  async create(@Body() ioHistory: Partial<IoHistoryEntity>): Promise<IoHistoryEntity> {
    return this.ioHistoryService.create(ioHistory);
  }
}
