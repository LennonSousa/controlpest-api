import express from 'express';
import cors from 'cors';
import 'express-async-errors';

require('dotenv/config');

const app = express();

const corsOptions = {
    origin: process.env.APP_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    exposedHeaders: 'X-Total-Pages',
}

app.use(cors(corsOptions));

app.use(express.json());

app.listen(process.env.PORT || 3333, () => {
    console.info(`> Server listening on port: ${process.env.PORT || 3333}`);
});