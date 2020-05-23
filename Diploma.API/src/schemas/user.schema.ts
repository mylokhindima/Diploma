import { Schema } from "mongoose";
import * as crypto from 'crypto';

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
        immutable: true,
    },
    salt: {
        type: String,
        required: true,
        immutable: true,
    },
    roles: {
        type: [Number],
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});

UserSchema.virtual('password').set(function (this: any , password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
});
