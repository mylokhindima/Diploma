import { Schema } from 'mongoose';

export const DiplomaSchema = new Schema({
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'Professor',
    },
    theme: {
        type: String,
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
    },
    stage: {
        type: Schema.Types.ObjectId,
        ref: 'Stage',
    },
    reports: {
        type: [Schema.Types.ObjectId],
        ref: 'Report',
    }, 
    mainReport: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    } 
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
