import express from 'express';
import { PORT } from './config';
import loaders from './loaders';

const startServer = async () => {
    const app = express();
    await loaders.init({ app });

    app.listen(PORT, () => {
        console.log(`server start at http://localhost:${PORT}`);
    });
};

startServer();
