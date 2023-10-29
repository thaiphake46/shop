'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Shop = require('../models/shop.model');
const KeyTokenService = require('./keytoken.service');
const { findByEmail } = require('./shop.service');
const { createTokenPair } = require('../auth/auth.utils');
const { getInfoData } = require('../utils');
const {
    ConflictRequestError,
    ForbiddenRequestError,
    AuthFailureError,
} = require('../core/error.response');

const ROLE_SHOP = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
};

class AccessService {
    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email });

        if (!foundShop) {
            throw new ForbiddenRequestError('Shop not registered');
        }

        const matchPw = bcrypt.compareSync(password, foundShop.password);

        if (!matchPw) {
            throw new AuthFailureError('Authentication error');
        }

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        const tokens = await createTokenPair(
            { userId: foundShop._id, email },
            publicKey,
            privateKey
        );

        await KeyTokenService.createKeyToken({
            userId: foundShop._id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,
        });

        return {
            shop: getInfoData({
                object: foundShop,
                fileds: ['_id', 'name', 'email'],
            }),
            tokens,
        };
    };

    static signUp = async ({ name, email, password }) => {
        const holderShop = await Shop.findOne({ email }).lean();

        if (holderShop) {
            throw new ConflictRequestError('Error: shop already registered');
        }

        const hashPw = await bcrypt.hash(password, 10);
        const newShop = await Shop.create({
            name,
            email,
            password: hashPw,
            roles: [ROLE_SHOP.SHOP],
        });

        if (newShop) {
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
            });

            if (!keyStore) {
                throw new ForbiddenRequestError('Error: public key error');
            }

            const tokens = await createTokenPair(
                { userId: newShop._id, email },
                publicKey,
                privateKey
            );

            return {
                shop: getInfoData({
                    object: newShop,
                    fileds: ['_id', 'name', 'email'],
                }),
                tokens,
            };
        }

        return {
            code: 200,
            metadata: null,
        };
    };
}

module.exports = AccessService;
