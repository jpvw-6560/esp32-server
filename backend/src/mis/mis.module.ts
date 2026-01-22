import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mis } from '../entities/mis.entity';
import { MisService } from './mis.service';
import { MisController } from './mis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mis])],
  providers: [MisService],
  controllers: [MisController],
  exports: [MisService],
})
export class MisModule {}
