import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfig } from '../entities/system-config.entity';

@Injectable()
export class SystemConfigService {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: Repository<SystemConfig>,
  ) {}

  findAll(): Promise<SystemConfig[]> {
    return this.systemConfigRepository.find();
  }

  findOne(id: number): Promise<SystemConfig> {
    return this.systemConfigRepository.findOneBy({ id });
  }

  findByKey(key_name: string): Promise<SystemConfig | null> {
    return this.systemConfigRepository.findOneBy({ key_name });
  }

  create(config: Partial<SystemConfig>): Promise<SystemConfig> {
    return this.systemConfigRepository.save(config);
  }

  update(id: number, config: Partial<SystemConfig>): Promise<any> {
    return this.systemConfigRepository.update(id, config);
  }

  remove(id: number): Promise<any> {
    return this.systemConfigRepository.delete(id);
  }
}
