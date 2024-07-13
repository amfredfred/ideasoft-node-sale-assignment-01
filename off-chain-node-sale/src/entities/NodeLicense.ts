import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { NodeFractionalLicense } from './NodeFractionalLicense';
import { NodeLicenseBatch } from './NodeLicenseBatch';

@Entity({ name: 'node_licenses' })
export class NodeLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => NodeFractionalLicense, fractionalLicense => fractionalLicense.nodeLicense)
  fractionalLicenses: NodeFractionalLicense[];

  @OneToOne(() => NodeLicenseBatch, nodeLicenseBatch => nodeLicenseBatch.nodeLicense)
  nodeLicenseBatch: NodeLicenseBatch

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}