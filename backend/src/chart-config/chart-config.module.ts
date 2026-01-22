import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartConfigEntity } from './chart-config.entity';
import { ChartConfigService } from './chart-config.service';
import { ChartConfigController } from './chart-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChartConfigEntity])],
  providers: [ChartConfigService],
  controllers: [ChartConfigController],
  exports: [ChartConfigService],
})
export class ChartConfigModule {}
