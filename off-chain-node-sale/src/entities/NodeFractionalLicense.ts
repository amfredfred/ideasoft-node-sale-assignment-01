import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { NodeLicense } from './NodeLicense';
import { NodeOwner } from './NodeOwner';

@Entity({ name: 'node_fractional_licenses' })
export class NodeFractionalLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('NodeLicense', 'fractional_licenses', { onDelete: 'RESTRICT' })
  license: NodeLicense;

  @ManyToOne('NodeOwner', 'fractional_licenses', { onDelete: 'RESTRICT' })
  owner: NodeOwner;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}