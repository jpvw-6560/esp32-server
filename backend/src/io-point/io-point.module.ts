import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IoPointEntity } from './io-point.entity';
import { IoPointService } from './io-point.service';
import { IoPointController } from './io-point.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IoPointEntity])],
  providers: [IoPointService],
  controllers: [IoPointController],
  exports: [IoPointService],
})
export class IoPointModule {}
