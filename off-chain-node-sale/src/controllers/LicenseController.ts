import { ICustomRequest } from "../middlewares/onRequestReceived";
import { NodeLicensingModel } from "../models";
import { Response } from 'express'


interface IPurchaseLicenseFraction extends ICustomRequest {
    body: {
        licenseId: string,
        fractionQuantity: number
        paymentReceipt: string
    }
}

export const PurchaseLicenseFraction = async (req: IPurchaseLicenseFraction, res: Response) => {
    const { body, user } = req;

    const licensing = new NodeLicensingModel()
    let licenses = licensing.licenses
    let fractions = licensing.fractions

    res.json({ message: 'Fractional license purchased successfully!' });
}