import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'esp_registry' })
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_name' })
  deviceName: string;

  @Column()
  mac: string;

  @Column({ name: 'ip_address', nullable: true })
  ipAddress?: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ name: 'server_key', nullable: true })
  serverKey?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'last_seen', type: 'datetime', nullable: true })
  lastSeen?: Date;
}
