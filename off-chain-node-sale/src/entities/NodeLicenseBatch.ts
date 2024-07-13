import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { NodeLicense } from './NodeLicense';

@Entity({ name: 'node_license_batches' })
export class NodeLicenseBatch {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany('NodeLicense', 'license_batch', { onDelete: 'RESTRICT' })
  licenses: NodeLicense[]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}