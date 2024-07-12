import { Request, Response, NextFunction } from 'express';

function onRequestReceived(req: Request, res: Response<any>, next: NextFunction) {
    console.log(`Request Received Timestamp: ${Date.now()}`)
    next()
    console.log(`Response Sent Timestamp: ${Date.now()}`)
}

export default onRequestReceived