import express from 'express'
import cors from 'cors'
import onRequestReceived from "./middlewares/onRequestReceived"
import { claimRewards, distributeRewards, purchaseShares } from './controllers/nodeOwnerController';
import NodeLicensingRoute from './routes/nodeLicensingRoute'

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

app.post("/purchase", purchaseShares);
app.post("/distribute", distributeRewards);
app.post("/claim", claimRewards);

app.use('/node-license', NodeLicensingRoute)

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