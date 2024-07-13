import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { NodeFractionalLicense } from "./NodeFractionalLicense";

@Entity({ name: 'node_owners' })
export class NodeOwner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    shares: number;

    @Column({ type: "decimal", default: 0 })
    rewards: number;

    @ManyToOne(() => NodeFractionalLicense, nodeFractionalLicense => nodeFractionalLicense.nodeOwner, { onDelete: 'RESTRICT' })
    nodeFractionalOwner: NodeFractionalLicense

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}