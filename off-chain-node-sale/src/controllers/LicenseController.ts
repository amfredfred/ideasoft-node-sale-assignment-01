import { dataSource } from "../data-source";
import { NodeFractionalLicense } from "../entities/NodeFractionalLicense";
import { NodeLicense } from "../entities/NodeLicense";
import { NodeLicenseBatch } from "../entities/NodeLicenseBatch";
import { ICustomRequest } from "../middlewares/onRequestReceived";
import { NodeLicensingModel } from "../models";
import { Response } from 'express'
import { v1 as uuid } from 'uuid';

interface IPurchaseLicenseFraction extends ICustomRequest {
    body: {
        license_id: number,
        quantity: number
        payment_hash: string,
        amount_paid: number
    }
}

export const PurchaseLicenseFraction = async (req: IPurchaseLicenseFraction, res: Response) => {
    const { body, user } = req;
    const queryRunner = dataSource.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const licensing = new NodeLicensingModel();
        const quantities = body?.quantity || 1;

        // Validate license ID
        const license = await licensing.licenses.getLicenseById(body?.license_id);
        if (!license) {
            return res.status(404).json({ message: `License with ID (${body?.license_id}) not found!` });
        }

        // Calculate the total due amount
        const totalDue = quantities * license.price_per_fraction;

        // Check payment success and amount
        const isPaymentSuccessful = body.payment_hash === 'HASH';
        const isCompleteAmount = body.amount_paid >= totalDue;

        if (!isPaymentSuccessful) {
            return res.status(402).json({ message: 'Your payment is not confirmed yet!!' });
        }

        if (!isCompleteAmount) {
            return res.status(402).json({
                message: 'Your payment is not complete.',
                required_amount: totalDue,
                amount_paid: body.amount_paid
            });
        }

        // Check availability of fractions
        if (license.available_fractions === 0) {
            return res.status(400).json({ message: 'Sorry! Out of stock!' });
        }

        if (license.available_fractions < quantities) {
            return res.status(403).json({ message: `Sorry! You can buy only ${license.available_fractions} fractions.` });
        }

        // Update available fractions in the license
        license.available_fractions -= quantities;
        await queryRunner.manager.save(license);

        // Create and save fractional license
        const fraction = new NodeFractionalLicense();
        fraction.license = license;
        fraction.owner = user;
        fraction.amount_paid = body.amount_paid;
        fraction.receipt_hash = body.payment_hash;

        const fractioned_license = await queryRunner.manager.save(fraction);

        // Commit transaction
        await queryRunner.commitTransaction();
        res.json({ message: 'Fractional license purchased successfully!', fractioned_license });
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('Error purchasing license fraction:', error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    } finally {
        await queryRunner.release();
    }
};

export const CreateLicenseBatch = async (req: ICustomRequest, res: Response) => {
    const { body, user } = req
    try {
        const originalUuid = uuid();
        const modifiedUuid = originalUuid.replace(/-/g, 'SKIP');
        const batch = new NodeLicenseBatch()
        batch.batch_uuid = modifiedUuid
        batch.expiring_timestamp = Number(body?.expiring_timestamp) || null
        const createdBatch = await dataSource.manager.save(batch)
        res.status(201).json({ message: 'License batch created successfully!', batch: createdBatch })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!', error })
    }
}


export const CreateLicense = async (req: ICustomRequest, res: Response) => {
    const { body } = req;
    try {
        const licensing = new NodeLicensingModel();
        const batch = await licensing.batchs.getBatchByuuid(body?.batch_uuid);

        if (!batch) {
            return res.status(404).json({ message: `Batch with uuid(${body?.batch_uuid}) not found!` });
        }

        if (batch.expiring_timestamp && batch.expiring_timestamp < Date.now()) {
            return res.status(401).json({ message: 'Batch already expired!' });
        }

        const license = new NodeLicense();
        license.available_fractions = 500;
        license.license_batch = batch;
        license.price_per_fraction = 50;
        license.total_fractions = 500;

        const createdLicense = await dataSource.manager.save(license);
        res.status(201).json({ message: 'License created successfully!', license: createdLicense });
    } catch (error) {
        console.error('Error creating license:', error);
        res.status(500).json({ message: 'Internal Server Error!', error });
    }
};