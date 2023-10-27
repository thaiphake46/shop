'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';

const dev = {
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME,
    },
};

const pro = {
    db: {
        host: process.env.PRO_DB_HOST,
        port: process.env.PRO_DB_PORT,
        name: process.env.PRO_DB_NAME,
    },
};

const config = { dev, pro };

module.exports = config[NODE_ENV];
