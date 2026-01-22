import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IoHistoryEntity } from './io-history.entity';
import { IoHistoryService } from './io-history.service';
import { IoHistoryController } from './io-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IoHistoryEntity])],
  providers: [IoHistoryService],
  controllers: [IoHistoryController],
  exports: [IoHistoryService],
})
export class IoHistoryModule {}
