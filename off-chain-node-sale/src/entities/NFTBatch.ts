import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FractionalNFT } from './FractionalNFT';

@Entity()
export class NFTBatch {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => FractionalNFT, (fractionalNFT) => fractionalNFT.batch)
    fractionalNFTs: FractionalNFT[];

    @Column({ nullable: true })
    nodeLicenseContractAddress: string;

    @Column({ nullable: true })
    nodeLicenseTokenID: string;

    @Column({ nullable: true })
    chain: string;

    @Column({ default: false })
    isFilled: boolean;
}
