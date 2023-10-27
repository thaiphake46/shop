'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'NucMD',
    });
});

router.use('/v1/api', require('./access'));

module.exports = router;
