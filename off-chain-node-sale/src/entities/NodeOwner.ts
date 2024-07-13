import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}