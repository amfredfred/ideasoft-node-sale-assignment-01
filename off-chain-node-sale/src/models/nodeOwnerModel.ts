'use strict'

import { dataSource } from "../data-source";
import { NodeOwner } from "../entities/NodeOwner";

export class NodeOwnerModel {
    private nodeOwnerRepository = dataSource.manager.getRepository(NodeOwner);

    async createNodeOwner(address: string, shares: number): Promise<NodeOwner> {
        const nodeOwner = new NodeOwner();
        nodeOwner.address = address;
        nodeOwner.shares = shares;
        return await this.nodeOwnerRepository.save(nodeOwner);
    }

    async findNodeOwnerById(id: number): Promise<NodeOwner | undefined> {
        return await this.nodeOwnerRepository.findOne({ where: { id } });
    }

    async findNodeOwnerByAddress(address: string): Promise<NodeOwner | undefined> {
        return await this.nodeOwnerRepository.findOne({ where: { address } });
    }

    async updateNodeOwner(id: number, shares: number, rewards: number): Promise<void> {
        await this.nodeOwnerRepository.update(id, { shares, rewards });
    }

    async deleteNodeOwner(id: number): Promise<void> {
        await this.nodeOwnerRepository.delete(id);
    }

    async findAllNodeOwners(): Promise<NodeOwner[]> {
        return await this.nodeOwnerRepository.find()
    }
}
