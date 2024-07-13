import { dataSource } from '../data-source'
import { NodeFractionalLicense } from '../entities/NodeFractionalLicense'
import { NodeLicense } from '../entities/NodeLicense'
import { NodeLicenseBatch } from '../entities/NodeLicenseBatch'

export class NodeLicensModel {

    async batch(license: NodeLicense): Promise<NodeLicenseBatch | null> {
        const nodeBatch = await dataSource.manager.findOne(NodeLicenseBatch, { where: { licenses: license } })
        return nodeBatch
    }

    async fractions(license: NodeLicense): Promise<NodeFractionalLicense[]> {
        const nodeLicensFractions = await dataSource.manager.findBy(NodeFractionalLicense, { license })
        return nodeLicensFractions
    }

    async allByBatch(license_batch: NodeLicenseBatch): Promise<NodeLicense[]> {
        const nodeLicenses = dataSource.manager.findBy(NodeLicense, { license_batch })
        return nodeLicenses
    }
}