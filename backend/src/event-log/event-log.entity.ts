import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'event_logs' })
export class EventLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'event_id', nullable: true })
  eventId?: number;

  @Column({ name: 'device_name' })
  deviceName: string;

  @Column({ name: 'symbolic_name' })
  symbolicName: string;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'float' })
  threshold: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'triggered_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  triggeredAt: Date;
}
