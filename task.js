import express from 'express';
import Logger from './utils/Logger';
import { PORT } from './config';
import sequelizeLoader from './loaders/Sequelize.Loader';
import ErrorController from './controllers/Error.Controller';
import UserRouter from './routes/User.Router';
import GroupRouter from './routes/Group.Router';

const startServer = async () => {
    await sequelizeLoader();
    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
        const { method, path, params, body, query } = req;
        Logger.info(`Request: ${method} ${path} with params: ${JSON.stringify(params)}, body: ${JSON.stringify(body)}, query: ${JSON.stringify(query)}`);
        next();
    });

    // initialize routes
    app.use('/users/', UserRouter);
    app.use('/groups/', GroupRouter);

    app.use(ErrorController.validationErrorHandler);
    app.use(ErrorController.serverErrorHandler);

    process.on('uncaughtException', (error) => {
        Logger.error(`Uncaught exception occured: the process will be exited ${error.message}`);
        process.exit(1);
    });

    process.on('unhandledRejection', (error) => {
        Logger.error(`Uncaught rejection occured: the process will be exited ${error.message}`);
        process.exit(1);
    });

    app.listen(PORT, () => {
        Logger.info(`server start at http://localhost:${PORT}`);
    });
};

startServer();
