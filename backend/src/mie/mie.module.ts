import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mie } from '../entities/mie.entity';
import { MieService } from './mie.service';
import { MieController } from './mie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mie])],
  providers: [MieService],
  controllers: [MieController],
  exports: [MieService],
})
export class MieModule {}
