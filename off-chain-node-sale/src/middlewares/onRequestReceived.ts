import { Request, Response, NextFunction } from 'express';
import { NodeOwner } from '../entities/NodeOwner';

export type ICustomRequest = {
    user: NodeOwner
} & Request

function onRequestReceived(req: ICustomRequest, res: Response<any>, next: NextFunction) {
    console.log(`Request Received Timestamp: ${Date.now()}`)
    next()
    console.log(`Response Sent Timestamp: ${Date.now()}`)
}

export default onRequestReceived