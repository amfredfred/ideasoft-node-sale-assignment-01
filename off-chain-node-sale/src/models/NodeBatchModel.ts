
import { dataSource } from "../data-source"
import { NodeLicense } from "../entities/NodeLicense"
import { NodeLicenseBatch } from "../entities/NodeLicenseBatch"
import { NodeLicensModel } from "./NodeLicensModel"

export class NodeBatchModel {
    async licenses(license_batch: NodeLicenseBatch): Promise<NodeLicense[]> {
        const licenses = new NodeLicensModel()
        return await licenses.allByBatch(license_batch)
    }

    async getBatchByuuid(batch_uuid: string): Promise<NodeLicenseBatch> {
        const licenseBatch = await dataSource.manager.findOneBy(NodeLicenseBatch, { batch_uuid })
        return licenseBatch
    }
}