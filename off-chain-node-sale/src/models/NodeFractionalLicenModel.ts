import { dataSource } from "../data-source";
import { NodeFractionalLicense } from "../entities/NodeFractionalLicense";
import { NodeLicense } from "../entities/NodeLicense";
import { NodeOwner } from "../entities/NodeOwner";

export class NodeFractionalLicenModel {

    async license(fraction: NodeFractionalLicense): Promise<NodeLicense | null> {
        const license = await dataSource.manager.findOne(NodeLicense, { where: { fractional_licenses: fraction } })
        return license
    }

    async owner(fractional_licenses: NodeFractionalLicense): Promise<NodeOwner | null> {
        const owner = await dataSource.manager.findOne(NodeOwner, { where: { fractional_licenses } })
        return owner
    }

    async belongsTo(owner: NodeOwner): Promise<NodeFractionalLicense[]> {
        const fractions = await dataSource.manager.findBy(NodeFractionalLicense, { owner })
        return fractions
    }

}