import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'io_points' })
export class IoPointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'module_id' })
  moduleId: number;

  @Column({ type: 'varchar', length: 16 })
  type: string;

  @Column({ name: 'index' })
  index: number;

  @Column({ name: 'symbolic_name', type: 'varchar', length: 64, nullable: true })
  symbolicName?: string;

  @Column({ name: 'absolute_name', type: 'varchar', length: 32, nullable: true })
  absoluteName?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  value?: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  unit?: string;

  @Column({ name: 'last_update', type: 'datetime', nullable: true })
  lastUpdate?: Date;

  @Column({ name: 'display_card', type: 'tinyint', default: 1 })
  displayCard: boolean;
}
