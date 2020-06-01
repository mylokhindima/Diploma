import { Schema } from 'mongoose';

export const TimeSectionSchema = new Schema({
    diplomaProtection: {
        type: Schema.Types.ObjectId,
        ref: 'DiplomaProtection',
        required: true,
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
    },
    startTime: {
        type: Date,
        required: true,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
