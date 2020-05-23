import { Schema } from 'mongoose';
import { RequestStatus } from '../enums/request-status.enum';

export const DiplomaInstructorRequestSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Professor',
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: RequestStatus.InReview,
    },
    declinedComment: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
