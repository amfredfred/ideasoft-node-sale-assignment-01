import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { NodeLicense } from './NodeLicense';
import { NodeOwner } from './NodeOwner';
import { NodeLicenseBatch } from './NodeLicenseBatch';

@Entity({ name: 'node_fractional_licenses' })
export class NodeFractionalLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NodeLicense, nl => nl.fractional_licenses)
  node_license: NodeLicense;

  @ManyToOne(() => NodeOwner, nflo => nflo.node_fractional_licenses)
  node_fractional_license_owner: NodeOwner

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}