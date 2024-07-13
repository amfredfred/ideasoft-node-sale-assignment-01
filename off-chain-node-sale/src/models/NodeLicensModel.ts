import { dataSource } from '../data-source'
import { NodeFractionalLicense } from '../entities/NodeFractionalLicense'
import { NodeLicense } from '../entities/NodeLicense'
import { NodeLicenseBatch } from '../entities/NodeLicenseBatch'

export class NodeLicensModel {

    async getBatch(license: NodeLicense): Promise<NodeLicenseBatch | null> {
        if (!(license instanceof NodeLicense)) return null
        const nodeBatch = await dataSource.manager.findOne(NodeLicenseBatch, { where: { licenses: license } })
        return nodeBatch
    }

    async getFractionsByLicense(license: NodeLicense): Promise<NodeFractionalLicense[]> {
        if (!(license instanceof NodeLicense)) return []
        const nodeLicensFractions = await dataSource.manager.findBy(NodeFractionalLicense, { license })
        return nodeLicensFractions
    }

    async getAllLicensesByBatchUuid(batch_uuid: string): Promise<NodeLicense[]> {
        if (typeof batch_uuid !== 'string') return []
        const nodeLicenses = await dataSource.manager.findBy(NodeLicense, { license_batch: { batch_uuid } })
        return nodeLicenses
    }

    async getLicenseById(license_id: number = undefined): Promise<NodeLicense | null> {
        if (isNaN(license_id)) return null
        const license = await dataSource.manager.findOne(NodeLicense, { where: { id: license_id } })
        return license
    }
}