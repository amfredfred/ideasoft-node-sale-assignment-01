import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { NodeLicense } from './NodeLicense';

@Entity({ name: 'node_fractional_licenses' })
export class FractionalLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buyer: string;

  @ManyToOne(() => NodeLicense, nodeLicense => nodeLicense.fractionalLicenses)
  nodeLicense: NodeLicense;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}