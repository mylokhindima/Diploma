import { Schema } from 'mongoose';

export const FileSchema = new Schema({
    type: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
