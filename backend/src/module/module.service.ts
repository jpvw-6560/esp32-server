import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from './module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
  ) {}

  findAll(): Promise<ModuleEntity[]> {
    return this.moduleRepository.find();
  }

  findOne(id: number): Promise<ModuleEntity | null> {
    return this.moduleRepository.findOneBy({ id });
  }

  create(module: Partial<ModuleEntity>): Promise<ModuleEntity> {
    const entity = this.moduleRepository.create(module);
    return this.moduleRepository.save(entity);
  }

  // Ajoute ici d'autres méthodes métier selon les besoins
}
