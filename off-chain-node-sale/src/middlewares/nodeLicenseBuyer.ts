import { Request, Response, NextFunction } from 'express';

function nodeLicenseBuyer(req: Request, res: Response<any>, next: NextFunction) {
    console.log("Node Licensse Buyer")
    next()
}

export default nodeLicenseBuyer