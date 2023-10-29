'use strict';

const express = require('express');
const AccessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const router = express.Router();

router.post('/shop/signup', asyncHandler(AccessController.signUp));
router.post('/shop/login', asyncHandler(AccessController.login));

module.exports = router;
