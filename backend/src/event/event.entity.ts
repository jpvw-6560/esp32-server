import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_name' })
  deviceName: string;

  @Column({ name: 'symbolic_name' })
  symbolicName: string;

  @Column({ name: 'io_type' })
  ioType: 'DI' | 'DO' | 'AI' | 'AO';

  @Column({ name: 'io_index' })
  ioIndex: number;

  @Column({ name: 'condition_type' })
  conditionType: '==' | '!=' | '>' | '<' | '>=' | '<=';

  @Column({ type: 'float' })
  threshold: number;

  @Column({ name: 'debounce_ms', type: 'int', default: 100 })
  debounceMs: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'tinyint', default: 1 })
  active: boolean;

  @Column({ name: 'capture_image', type: 'tinyint', default: 0 })
  captureImage: boolean;

  @Column({ name: 'capture_device', nullable: true })
  captureDevice?: string;

  @Column({ name: 'send_telegram', type: 'tinyint', default: 0 })
  sendTelegram: boolean;

  @Column({ name: 'telegram_message', type: 'varchar', length: 500, nullable: true })
  telegramMessage?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
