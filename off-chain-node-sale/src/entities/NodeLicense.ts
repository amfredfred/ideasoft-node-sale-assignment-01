import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { NodeFractionalLicense } from './NodeFractionalLicense';
import { NodeLicenseBatch } from './NodeLicenseBatch';

@Entity({ name: 'node_licenses' })
export class NodeLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  price_per_fraction: number

  @Column({ type: 'bigint' })
  total_fractions: number

  @Column({ type: 'bigint' })
  available_fractions: number

  @OneToMany('NodeFractionalLicense', 'license', { onDelete: 'RESTRICT' })
  fractional_licenses: NodeFractionalLicense[];

  @ManyToOne('NodeLicenseBatch', 'licenses', { onDelete: 'RESTRICT' })
  license_batch: NodeLicenseBatch

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}