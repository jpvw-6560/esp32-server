import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'mie' })
export class Mie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  mac: string;

  @Column('text')
  mie: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
