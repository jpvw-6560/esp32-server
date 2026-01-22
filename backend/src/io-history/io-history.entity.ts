import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'io_history' })
export class IoHistoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'device_name' })
  deviceName: string;

  @Column({ name: 'symbolic_name' })
  symbolicName: string;

  @Column({ name: 'io_type' })
  ioType: 'DI' | 'DO' | 'AI' | 'AO';

  @Column({ name: 'io_index' })
  ioIndex: number;

  @Column({ type: 'float' })
  value: number;

  @Column({ name: 'recorded_at', type: 'timestamp' })
  recordedAt: Date;
}
