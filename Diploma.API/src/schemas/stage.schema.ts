import { Schema } from 'mongoose';
import { Step } from './../enums/step.enum';

export const StageSchema = new Schema({
    endDate: {
        type: Date,
    },
    step: {
        type: Number,
        default: Step.ChooseInstructor,
        required: true,
        unique: true,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
