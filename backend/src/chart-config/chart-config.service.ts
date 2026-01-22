import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartConfigEntity } from './chart-config.entity';

@Injectable()
export class ChartConfigService {
  constructor(
    @InjectRepository(ChartConfigEntity)
    private readonly chartConfigRepository: Repository<ChartConfigEntity>,
  ) {}

  findAll(): Promise<ChartConfigEntity[]> {
    return this.chartConfigRepository.find();
  }

  findOne(id: number): Promise<ChartConfigEntity | null> {
    return this.chartConfigRepository.findOneBy({ id });
  }

  create(chartConfig: Partial<ChartConfigEntity>): Promise<ChartConfigEntity> {
    const entity = this.chartConfigRepository.create(chartConfig);
    return this.chartConfigRepository.save(entity);
  }
}
