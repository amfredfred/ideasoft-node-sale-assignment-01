import express from 'express'
import cors from 'cors'
import onRequestReceived, { ICustomRequest } from "./middlewares/onRequestReceived"
import { dataSource } from './data-source';
import { NFTOwner } from './entities/NFTOwner';
import { FractionalNFT } from './entities/FractionalNFT';
import { NFTBatch } from './entities/NFTBatch';

const app = express()

const corsOptions = {
    origin: ['http://localhost:5173', 'http://192.168.1.119:5173'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'address']
};

app.use(cors(corsOptions))
app.options('*', cors(corsOptions));
app.use(onRequestReceived)
app.use(express.json());

const userRepository = dataSource.getRepository(NFTOwner);
const fractionalNFTRepository = dataSource.getRepository(FractionalNFT);
const batchRepository = dataSource.getRepository(NFTBatch);

app.post('/purchase', async (req, res) => {
    const dbTransaction = dataSource.createQueryRunner()
    try {
        const { walletAddress, chain, chainId, quantity } = req.body;

        const contract = {
            fractionalNFTContractAddress: 'fractionalNFTContractAddress',
            fractionalNFTTokenID: 'fractionalNFTTokenID',
        }

        const fractions = await fractionalNFTRepository.findOne({ where: { owner: { walletAddress } } });
        // if (fractions) return res.status(401).send({ message: "You have some fractions already." })
        if (!walletAddress) return res.status(401).send({ message: "Your address is invalid" })

        await dbTransaction.startTransaction()
        let user = await userRepository.findOne({ where: { walletAddress } });
        if (!user) {
            user = new NFTOwner();
            user.walletAddress = walletAddress;
            await dbTransaction.manager.save(user);
        }

        const fractionalNFT = new FractionalNFT();
        fractionalNFT.owner = user;
        fractionalNFT.fractionalNFTContractAddress = contract.fractionalNFTContractAddress;
        fractionalNFT.fractionalNFTTokenID = contract.fractionalNFTTokenID;
        fractionalNFT.chain = chain;
        fractionalNFT.chainID = chainId;
        fractionalNFT.quantity = quantity

        let batch = await batchRepository.findOne({ where: { isFilled: false }, relations: ['fractionalNFTs'] });
        if (!batch) {
            batch = new NFTBatch();
            batch.fractionalNFTs = [];
            batch = await dbTransaction.manager.save(batch);
            batch.nodeLicenseContractAddress = '0xNodeLicenseContractAddress';
            batch.nodeLicenseTokenID = 'NodeLicenseTokenID';
            batch.chain = chain;
        }

        fractionalNFT.batch = batch;
        batch.fractionalNFTs.push(fractionalNFT);

        if (batch.fractionalNFTs.length === 10) {
            batch.isFilled = true;
        }

        await dbTransaction.manager.save(fractionalNFT);
        batch = await dbTransaction.manager.save(batch);

        await dbTransaction.commitTransaction()
        res.json({ message: "Succesful" });
    } catch (error) {
        await dbTransaction.rollbackTransaction()
        console.log({ error })
        res.status(500).json(error)
    }
    finally {
        await dbTransaction.release()
    }
});

app.get('/batches', async (req, res) => {
    const batches = await batchRepository.find({ relations: ['fractionalNFTs', 'fractionalNFTs.owner'] });
    res.json(batches);
});

app.get('/fractions', async (req: ICustomRequest, res) => {
    const { user: { walletAddress } } = req
    const fractions = await fractionalNFTRepository.find({ where: { owner: { walletAddress } } });
    res.json(fractions);
});

app.post('/mint', () => {

})

app.post('/batch/fill', async (req, res) => {
    const batch = await batchRepository.findOne({ where: { id: req.body.batchId, }, relations: ['fractionalNFTs'] });
    if (batch.fractionalNFTs.length === 10) {
        batch.isFilled = true;
        batch.nodeLicenseContractAddress = '0xNodeLicenseContractAddress';
        batch.nodeLicenseTokenID = 'NodeLicenseTokenID';
        batch.chain = batch.fractionalNFTs[0].chain;
        await batchRepository.save(batch);
    }
    res.send(batch);
});

app.use(function (req, res, next) {
    console.log("Not Found")
    res.status(404).send({ absolutely: "Nothing Here" })
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app