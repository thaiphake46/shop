'use strict';

const AccessService = require('../services/access.service');
const { OK, Created } = require('../core/success.response');

class AccessController {
    static signUp = async (req, res, next) => {
        new Created({
            message: 'Registered OK',
            metadata: await AccessService.signUp(req.body),
        }).send(res);
    };
}

module.exports = AccessController;
