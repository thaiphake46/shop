'use strict';

const KeyToken = require('../models/keytoken.model');

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await KeyToken.create({
                user: userId,
                publicKey,
                privateKey,
            });

            return tokens ? tokens.publicKey : null;
            //
        } catch (error) {
            return error;
        }
    };
}

module.exports = KeyTokenService;
