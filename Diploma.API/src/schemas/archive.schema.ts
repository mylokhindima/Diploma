import { Schema } from 'mongoose';

export const ArchiveSchema = new Schema({
    otherFiles: {
        type: [Schema.Types.ObjectId],
        ref: 'File',
        default: [],
    },
    diplomaReport: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
        required: true,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
