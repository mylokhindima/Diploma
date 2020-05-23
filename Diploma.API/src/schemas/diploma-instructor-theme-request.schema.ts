import { Schema } from 'mongoose';

export const DiplomaInstructorThemeRequestSchema = new Schema({
    theme: {
        type: String,
        required: true,
    },
    methodologicalCommissionApprove: {
        type: Boolean,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});

 
