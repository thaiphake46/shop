'use strict';
const mongoose = require('mongoose');
const { db } = require('../configs/configMongodb');

const STR_CONNECT = `mongodb://${db.host}:${db.port}/${db.name}`;

class Database {
    constructor() {
        this.connect();
    }

    connect = () => {
        mongoose
            .connect(STR_CONNECT, {
                maxPoolSize: 50,
            })
            .then(() => {
                console.log('connect mongodb successed');
            })
            .catch((error) => {
                console.log('connect failed');
            });

        if (true) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
    };

    static getInstance = () => {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    };
}

const instance = Database.getInstance();

module.exports = instance;
