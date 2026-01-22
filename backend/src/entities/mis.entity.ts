import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'mis' })
export class Mis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  mac: string;

  @Column('text')
  mis: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
