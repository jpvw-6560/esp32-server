import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MisService } from './mis.service';
import { Mis } from '../entities/mis.entity';

@Controller('mis')
export class MisController {
  constructor(private readonly misService: MisService) {}

  @Get()
  findAll(): Promise<Mis[]> {
    return this.misService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Mis> {
    return this.misService.findOne(id);
  }

  @Post()
  create(@Body() mis: Partial<Mis>): Promise<Mis> {
    return this.misService.create(mis);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() mis: Partial<Mis>): Promise<any> {
    return this.misService.update(id, mis);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.misService.remove(id);
  }
}
