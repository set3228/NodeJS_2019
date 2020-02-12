import Sequelize from 'sequelize';
import { DB_CONFIG } from '../config';

export default new Sequelize(
    DB_CONFIG.NAME,
    DB_CONFIG.LOGIN,
    DB_CONFIG.PASSWORD,
    DB_CONFIG.OPTIONS
);
