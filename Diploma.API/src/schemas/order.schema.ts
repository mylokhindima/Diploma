import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
    educationalProgram: {
        type: Schema.Types.ObjectId,
        ref: 'EducationalProgram',
        required: true,
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'File',
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
