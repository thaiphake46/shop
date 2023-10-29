'use strict';

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

const keySchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, require: true, ref: 'Shop' },
        publicKey: { type: String, require: true },
        privateKey: { type: String, require: true },
        refreshToken: { type: String, require: true },
        refreshTokensUsed: { type: Array, default: [] },
    },
    { timestamps: true, collection: COLLECTION_NAME }
);

const KeyToken = model(DOCUMENT_NAME, keySchema);

module.exports = KeyToken;
