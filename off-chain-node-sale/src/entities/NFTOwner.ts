import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FractionalNFT } from './FractionalNFT';

@Entity()
export class NFTOwner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    walletAddress: string;

    @OneToMany(() => FractionalNFT, (fractionalNFT) => fractionalNFT.owner)
    fractionalNFTs: FractionalNFT[];
}