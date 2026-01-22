import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventLogEntity } from './event-log.entity';
import { EventLogService } from './event-log.service';
import { EventLogController } from './event-log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventLogEntity])],
  providers: [EventLogService],
  controllers: [EventLogController],
  exports: [EventLogService],
})
export class EventLogModule {}
