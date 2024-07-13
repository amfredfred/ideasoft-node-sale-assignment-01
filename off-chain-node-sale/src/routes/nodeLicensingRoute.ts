import { dataSource } from "../data-source";
import { NodeFractionalLicense } from "../entities/NodeFractionalLicense";
import { NodeLicense } from "../entities/NodeLicense";
import { NodeLicenseBatch } from "../entities/NodeLicenseBatch";

import express from 'express'
import nodeLicenseBuyer from "../middlewares/nodeLicenseBuyer";

const route = express.Router()
route.use(nodeLicenseBuyer)

route.post('/buy-fraction', async (req, res) => {
    const { buyer } = req.body;

    const fractionalLicenseRepository = dataSource.getRepository(NodeFractionalLicense);
    const nodeLicenseRepository = dataSource.getRepository(NodeLicense);
    const batchRepository = dataSource.getRepository(NodeLicenseBatch);

    let batch = await batchRepository.findOne({ where: { nodeLicenseCount: 0 } });

    if (!batch) {
        batch = new NodeLicenseBatch();
        batch.nodeLicenseCount = 0;
        await batchRepository.save(batch);
    }

    // Find a node license with less than 10 fractional licenses
    let nodeLicense = await nodeLicenseRepository.createQueryBuilder('nodeLicense')
        .leftJoinAndSelect('nodeLicense.fractionalLicenses', 'fractionalLicense')
        .where('nodeLicense.batchId = :batchId', { batchId: batch.id })
        .having('COUNT(fractionalLicense.id) < 10')
        .getOne();

    if (!nodeLicense) {
        nodeLicense = new NodeLicense();
        nodeLicense.batchId = batch.id;
        nodeLicense.fractionalLicenses = [];
        await nodeLicenseRepository.save(nodeLicense);
    }

    const fractionalLicense = new NodeFractionalLicense();
    fractionalLicense.buyer = buyer;
    fractionalLicense.nodeLicense = nodeLicense;

    await fractionalLicenseRepository.save(fractionalLicense);

    // Check if the node license is fully fractionalized
    const count = await fractionalLicenseRepository.count({ where: { nodeLicense: { id: nodeLicense.id } } });
    if (count === 10) {
        batch.nodeLicenseCount += 1;
        await batchRepository.save(batch);
        console.log(`Node license ${nodeLicense.id} is now fully fractionalized and added to batch ${batch.id}`);
    }

    res.json({ message: 'Fractional license purchased successfully!' });
});


export default route