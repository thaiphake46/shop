'use strict';

const AccessService = require('../services/access.service');
const { OK, CREATED } = require('../core/success.response');

class AccessController {
    static login = async (req, res, next) => {
        const { email, password } = req.body;

        new OK({
            message: 'login success',
            metadata: await AccessService.login({
                email,
                password,
            }),
        }).send(res);
    };

    static signUp = async (req, res, next) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await AccessService.signUp(req.body),
        }).send(res);
    };
}

module.exports = AccessController;
