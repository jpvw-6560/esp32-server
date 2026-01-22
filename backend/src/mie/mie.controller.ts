import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MieService } from './mie.service';
import { Mie } from '../entities/mie.entity';

@Controller('mie')
export class MieController {
  constructor(private readonly mieService: MieService) {}

  @Get()
  findAll(): Promise<Mie[]> {
    return this.mieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Mie> {
    return this.mieService.findOne(id);
  }

  @Post()
  create(@Body() mie: Partial<Mie>): Promise<Mie> {
    return this.mieService.create(mie);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() mie: Partial<Mie>): Promise<any> {
    return this.mieService.update(id, mie);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.mieService.remove(id);
  }
}
