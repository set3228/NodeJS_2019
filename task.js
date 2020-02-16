import express from 'express';
import { PORT } from './config';
import sequelizeLoader from './loaders/Sequelize.Loader';
import UserRouter from './routes/User.Router';

const startServer = async () => {
    await sequelizeLoader();
    const app = express();
    app.use(express.json());

    // initialize routes
    app.use('/users/', UserRouter);

    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        res.status(400).json({ message: error });
    });

    app.listen(PORT, () => {
        console.log(`server start at http://localhost:${PORT}`);
    });
};

startServer();
