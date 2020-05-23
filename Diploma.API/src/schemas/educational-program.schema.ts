import { Schema } from 'mongoose';

export const EducationalProgramSchema = new Schema({
    specialty: {
        type: Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true,
    },
    degree: {
        type: Number,
        required: true,
    },
    form: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
