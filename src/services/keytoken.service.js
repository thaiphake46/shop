'use strict';

const KeyToken = require('../models/keytoken.model');

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
        refreshToken,
    }) => {
        try {
            const filter = { user: userId };
            const update = {
                publicKey,
                privateKey,
                refreshToken,
                refreshTokensUsed: [],
            };
            const options = { upsert: true, new: true };

            const tokens = await KeyToken.findOneAndUpdate(
                filter,
                update,
                options
            );

            return tokens ? tokens.publicKey : null;
            //
        } catch (error) {
            return error;
        }
    };
}

module.exports = KeyTokenService;
