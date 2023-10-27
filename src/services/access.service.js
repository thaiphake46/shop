'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Shop = require('../models/shop.model');
const KeyTokenService = require('./keytoken.service');
const { createTokenPair } = require('../auth/auth.utils');
const { getInfoData } = require('../utils');

const ROLE_SHOP = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            const holderShop = await Shop.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'shop already registered',
                };
            }

            const hashPw = await bcrypt.hash(password, 10);
            const newShop = await Shop.create({
                name,
                email,
                password: hashPw,
                roles: [ROLE_SHOP.SHOP],
            });

            if (newShop) {
                // const { privateKey, publicKey } = crypto.generateKeyPairSync(
                //     'rsa',
                //     {
                //         modulusLength: 4096,
                //         publicKeyEncoding: {
                //             type: 'pkcs1',
                //             format: 'pem',
                //         },
                //         privateKeyEncoding: {
                //             type: 'pkcs1',
                //             format: 'pem',
                //         },
                //     }
                // );

                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey,
                });

                if (!keyStore) {
                    return {
                        code: 'xxxx',
                        message: 'public key error',
                    };
                }

                const tokens = await createTokenPair(
                    { userId: newShop._id, email },
                    publicKey,
                    privateKey
                );

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({
                            object: newShop,
                            fileds: ['_id', 'name', 'email'],
                        }),
                        tokens,
                    },
                };
            }

            return {
                code: 200,
                metadata: null,
            };
            //
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error',
            };
        }
    };
}

module.exports = AccessService;
