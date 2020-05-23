import { Schema } from 'mongoose';

export const ReportSchema = new Schema({
    comments: {
        type: [String],
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'File',
    },
    diploma: {
        type: Schema.Types.ObjectId,
        ref: 'Diploma',
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
