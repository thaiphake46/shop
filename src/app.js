'use strict';

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// inti db
require('./db/initMongodb');

// init route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'NucMD',
    });
});

// handle error

module.exports = app;
