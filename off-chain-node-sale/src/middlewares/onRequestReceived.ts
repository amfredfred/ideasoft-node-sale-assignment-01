import { Request, Response, NextFunction } from 'express';
import { NFTOwner } from '../entities/NFTOwner';
import { dataSource } from '../data-source';

export type ICustomRequest = {
    user: NFTOwner
} & Request

async function onRequestReceived(req: ICustomRequest, res: Response<any>, next: NextFunction) {
    let user = await dataSource.manager.findOne(NFTOwner, { where: { walletAddress: String(req.headers?.address) } })
    if (!user) {
        if (!req.headers?.address)
            return res.status(404).send({ message: "User Not Found" })
        user = new NFTOwner();
        user.walletAddress = String(req.headers?.address)
        await dataSource.manager.save(user);
    }
    req.user = user
    console.log(`Request Received Timestamp: ${Date.now()}`)
    next()
    console.log(`Response Sent Timestamp: ${Date.now()}`)
}

export default onRequestReceived