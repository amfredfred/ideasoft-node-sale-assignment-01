import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:'node_owners'})
export class NodeOwner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    shares: number;

    @Column({ type: "decimal", default: 0 })
    rewards: number;
}