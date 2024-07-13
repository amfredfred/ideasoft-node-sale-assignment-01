import { ICustomRequest } from "../middlewares/onRequestReceived";
import { Response } from 'express'
import { NodeLicensingModel } from "../models";

export const GetBatches = async (req: ICustomRequest, res: Response) => {
    const { user } = req
    try {
        const licensing = new NodeLicensingModel()
        const batches = await licensing.batchs.getAllBatches()
        res.json({ message: '', batches })
    } catch (error) {
        res.json({ message: '', error })
    }
}

export const GetLicenses = async (req: ICustomRequest, res: Response) => {
    const { user, body } = req
    try {
        const licensing = new NodeLicensingModel()
        const licenses = await licensing.licenses.getAllLicensesByBatchUuid(body?.batch_uuid)
        res.json({ message: '', licenses })
    } catch (error) {
        res.json({ message: '', error })
    }
} 