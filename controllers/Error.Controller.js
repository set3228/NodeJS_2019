import Logger from '../utils/Logger';

const validationErrorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        Logger.info(`Validation error, detailes: ${JSON.stringify(err.details)}`);
        return res.status(400).json({ message: err });
    }

    next(err);
};

// eslint-disable-next-line no-unused-vars
const serverErrorHandler = (err, req, res, next) => {
    Logger.error(`Internal server error: ${JSON.stringify(err)}`);
    res.status(500).json({ message: 'Internal server error' });
};

export default {
    validationErrorHandler,
    serverErrorHandler
};
