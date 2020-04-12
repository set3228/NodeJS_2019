import Sequelize from 'sequelize';
import Logger from '../utils/Logger';

const MODULE_NAME = 'connectDB';

let connection;

try {
    connection = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_LOGIN,
        process.env.DB_PASSWORD,
        {
            host: process.env.HOST,
            dialect: process.env.DIALECT
        }
    );
} catch (error) {
    Logger.warn(`${MODULE_NAME} connection to database is failed`);
}

export default connection;
