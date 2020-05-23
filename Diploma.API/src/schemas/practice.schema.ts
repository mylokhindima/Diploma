import { Schema } from 'mongoose';

export const PracticeSchema = new Schema({
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Professor',
    },
    location: {
        type: String,
    },
    student: {  
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    score: {
        type: Number,
        max: 100,
        min: 0,
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'File',
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
