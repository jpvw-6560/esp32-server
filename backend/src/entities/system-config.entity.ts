import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, Unique } from 'typeorm';

@Entity({ name: 'system_config' })
@Unique(['key_name'])
export class SystemConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'key_name', length: 64 })
  key_name: string;

  @Column({ length: 255 })
  value: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
