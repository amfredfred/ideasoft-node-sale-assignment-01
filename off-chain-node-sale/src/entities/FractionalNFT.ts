import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { NFTOwner } from './NFTOwner';
import { NFTBatch } from './NFTBatch';

@Entity()
export class FractionalNFT {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NFTOwner, (user) => user.fractionalNFTs)
  owner: NFTOwner;

  @ManyToOne(() => NFTBatch, (batch) => batch.fractionalNFTs)
  batch: NFTBatch;

  @Column()
  fractionalNFTContractAddress: string;

  @Column()
  fractionalNFTTokenID: string;

  @Column()
  chain: string;

  @Column()
  quantity: number

  @Column()
  chainID: string;
}