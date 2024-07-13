import { NodeBatchModel } from "./NodeBatchModel";
import { NodeFractionalLicenModel } from "./NodeFractionalLicenModel";
import { NodeLicensModel } from "./NodeLicensModel";
import { NodeOwnerModel } from './NodeOwnerModel'

export class NodeLicensingModel {
    public batchs: NodeBatchModel = (new NodeBatchModel)
    public licenses: NodeLicensModel = (new NodeLicensModel);
    public fractions: NodeFractionalLicenModel = (new NodeFractionalLicenModel)
    public owners: NodeOwnerModel = (new NodeOwnerModel)
}