import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { NodeFractionalLicense } from './NodeFractionalLicense';
import { NodeLicenseBatch } from './NodeLicenseBatch';

@Entity({ name: 'node_licenses' })
export class NodeLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_fraction: number

  @Column({ type: 'bigint' })
  total_fractions: number

  @Column({ type: 'bigint' })
  available_fractions: number

  @OneToMany(() => NodeFractionalLicense, nfl => nfl.node_license)
  fractional_licenses: NodeFractionalLicense[];

  @ManyToOne(() => NodeLicenseBatch, nlb => nlb.node_licenses)
  nodeLicense_batch: NodeLicenseBatch

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}