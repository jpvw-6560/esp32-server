import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChartConfigService } from './chart-config.service';
import { ChartConfigEntity } from './chart-config.entity';

@Controller('chart-configs')
export class ChartConfigController {
  constructor(private readonly chartConfigService: ChartConfigService) {}

  @Get()
  async findAll(): Promise<ChartConfigEntity[]> {
    return this.chartConfigService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ChartConfigEntity | null> {
    return this.chartConfigService.findOne(Number(id));
  }

  @Post()
  async create(@Body() chartConfig: Partial<ChartConfigEntity>): Promise<ChartConfigEntity> {
    return this.chartConfigService.create(chartConfig);
  }
}
