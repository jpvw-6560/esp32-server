import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleEntity } from './module.entity';

@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  async findAll(): Promise<ModuleEntity[]> {
    return this.moduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ModuleEntity | null> {
    return this.moduleService.findOne(Number(id));
  }

  @Post()
  async create(@Body() module: Partial<ModuleEntity>): Promise<ModuleEntity> {
    return this.moduleService.create(module);
  }
}
