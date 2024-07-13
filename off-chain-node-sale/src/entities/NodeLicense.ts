import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FractionalLicense } from './NodeFractionalLicense';

@Entity({name:'node_licenses'})
export class NodeLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  batchId: number;

  @OneToMany(() => FractionalLicense, fractionalLicense => fractionalLicense.nodeLicense)
  fractionalLicenses: FractionalLicense[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}