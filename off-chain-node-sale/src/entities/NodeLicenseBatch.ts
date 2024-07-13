import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { NodeFractionalLicense } from './NodeFractionalLicense';
import { NodeLicense } from './NodeLicense';

@Entity({ name: 'node_license_batches' })
export class NodeLicenseBatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nodeLicenseCount: number;

  @OneToOne(() => NodeLicense, nodeLicense => nodeLicense.nodeLicenseBatch)
  nodeLicense: NodeLicense

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}