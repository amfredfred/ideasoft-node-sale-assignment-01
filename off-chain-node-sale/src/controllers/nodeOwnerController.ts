'use strict'

import { Request, Response } from "express";
import { NodeOwnerModel } from "../models/nodeOwnerModel";

const Nom = new NodeOwnerModel();

export const purchaseShares = async (req: Request, res: Response) => {
    const { address, shares } = req.body;
    const cost = shares * 50; // $50 per share
    // Payment logic here (omitted for simplicity)
    let nodeOwner = await Nom.findNodeOwnerByAddress(address);
    if (!nodeOwner) {
        nodeOwner = await Nom.createNodeOwner(address, shares);
    } else {
        nodeOwner.shares += shares;
        await Nom.updateNodeOwner(nodeOwner.id, nodeOwner.shares, nodeOwner.rewards);
    }
    res.send('Shares purchased successfully');
};

export const distributeRewards = async (req: Request, res: Response) => {
    const { totalRewards } = req.body;
    const owners = await Nom.findAllNodeOwners();
    let totalShares = owners.reduce((acc, owner) => acc + owner.shares, 0);
    for (let owner of owners) {
        owner.rewards += (owner.shares / totalShares) * totalRewards;
        await Nom.updateNodeOwner(owner.id, owner.shares, owner.rewards);
    }
    res.send('Rewards distributed successfully');
};

export const claimRewards = async (req: Request, res: Response) => {
    const { address } = req.body;
    let owner = await Nom.findNodeOwnerByAddress(address);
    if (owner && owner.rewards > 0) {
        const rewards = owner.rewards;
        owner.rewards = 0;
        await Nom.updateNodeOwner(owner.id, owner.shares, owner.rewards);
        // Payment logic here (omitted for simplicity)
        res.send(`Rewards of ${rewards} claimed successfully`);
    } else {
        res.status(400).send('No rewards to claim');
    }
};
