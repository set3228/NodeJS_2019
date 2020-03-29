const PORT = 3000;
const DB_CONFIG = {
    NAME: 'nodejs',
    LOGIN: 'root',
    PASSWORD: 'qqq',
    OPTIONS: {
        host: 'localhost',
        dialect: 'postgres'
    }
};

const JWT_SECRET_KEY = 'JWT_SECRET_KEY';

export {
    PORT,
    DB_CONFIG,
    JWT_SECRET_KEY
};
