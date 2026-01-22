import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SystemConfigService } from './system-config.service';
import { SystemConfig } from '../entities/system-config.entity';

@Controller('system-config')
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @Get()
  findAll(): Promise<SystemConfig[]> {
    return this.systemConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SystemConfig> {
    return this.systemConfigService.findOne(id);
  }

  @Get('key/:key_name')
  findByKey(@Param('key_name') key_name: string): Promise<SystemConfig | null> {
    return this.systemConfigService.findByKey(key_name);
  }

  @Post()
  create(@Body() config: Partial<SystemConfig>): Promise<SystemConfig> {
    return this.systemConfigService.create(config);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() config: Partial<SystemConfig>): Promise<any> {
    return this.systemConfigService.update(id, config);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.systemConfigService.remove(id);
  }
}
