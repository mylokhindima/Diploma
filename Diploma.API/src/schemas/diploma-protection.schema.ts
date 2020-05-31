import { Schema } from 'mongoose';

export const DiplomaProtectionSchema = new Schema({
    educationalProgram: {
        type: Schema.Types.ObjectId,
        ref: 'EducationalProgram',
        required: true,
    },
    timeStart: {
        type: Date,
        required: true,
    },
    timeEnd: {
        type: Date,
        required: true,
    },
    shift: {
        type: Number,
        required: true,
        default: 30,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
