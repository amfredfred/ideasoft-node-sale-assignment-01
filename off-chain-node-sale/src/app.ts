import express from 'express'
import cors from 'cors'
import onRequestReceived from "./middlewares/onRequestReceived"
import { dataSource } from './data-source';
import { NFTOwner } from './entities/NFTOwner';
import { FractionalNFT } from './entities/FractionalNFT';
import { NFTBatch } from './entities/NFTBatch';

const app = express()

const corsOptions = {
    origin: ['http://localhost:5173', 'http://192.168.1.119:5173'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'x-t-id']
};

app.use(cors(corsOptions))
app.options('*', cors(corsOptions));
app.use(onRequestReceived)
app.use(express.json());

const userRepository = dataSource.getRepository(NFTOwner);
const fractionalNFTRepository = dataSource.getRepository(FractionalNFT);
const batchRepository = dataSource.getRepository(NFTBatch);

app.post('/purchase', async (req, res) => {
    const { walletAddress, fractionalNFTContractAddress, fractionalNFTTokenID, chain, chainID } = req.body;

    let user = await userRepository.findOne({ where: { walletAddress } });
    if (!user) {
        user = new NFTOwner();
        user.walletAddress = walletAddress;
        await userRepository.save(user);
    }

    const fractionalNFT = new FractionalNFT();
    fractionalNFT.owner = user;
    fractionalNFT.fractionalNFTContractAddress = fractionalNFTContractAddress;
    fractionalNFT.fractionalNFTTokenID = fractionalNFTTokenID;
    fractionalNFT.chain = chain;
    fractionalNFT.chainID = chainID;

    let batch = await batchRepository.findOne({ where: { isFilled: false }, relations: ['fractionalNFTs'] });
    if (!batch) {
        batch = new NFTBatch();
        batch.fractionalNFTs = [];
    }

    fractionalNFT.batch = batch;
    batch.fractionalNFTs.push(fractionalNFT);

    if (batch.fractionalNFTs.length === 10) {
        batch.isFilled = true;
        batch.nodeLicenseContractAddress = '0xNodeLicenseContractAddress';
        batch.nodeLicenseTokenID = 'NodeLicenseTokenID';
        batch.chain = chain;
    }

    await fractionalNFTRepository.save(fractionalNFT);
    await batchRepository.save(batch);

    res.send(batch);
});

app.get('/batches', async (req, res) => {
    const batches = await batchRepository.find({ relations: ['fractionalNFTs', 'fractionalNFTs.owner'] });
    res.send(batches);
});

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