
import { dataSource } from "../data-source"
import { NodeLicense } from "../entities/NodeLicense"
import { NodeLicenseBatch } from "../entities/NodeLicenseBatch"
import { NodeLicensModel } from "./NodeLicensModel"

export class NodeBatchModel {
    async licenses(batch_uuid: string): Promise<NodeLicense[]> {
        if (typeof batch_uuid !== 'string') return []
        const licenses = new NodeLicensModel()
        return await licenses.getAllLicensesByBatchUuid(batch_uuid)
    }

    async getBatchByuuid(batch_uuid: string): Promise<NodeLicenseBatch> {
        const licenseBatch = await dataSource.manager.findOneBy(NodeLicenseBatch, { batch_uuid })
        return licenseBatch
    }

    async getAllBatches(): Promise<NodeLicenseBatch[]> {
        const licenseBatches = await dataSource.manager.find(NodeLicenseBatch)
        return licenseBatches
    }
}