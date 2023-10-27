'use strict';

require('dotenv/config');
const app = require('./src/app');
const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
    console.log('running on port ' + PORT);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('exit');
    });
});
