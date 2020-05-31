import { Schema } from 'mongoose';

export const SpecialtySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true, 
    },
    educationalPrograms: [ { type: Schema.Types.ObjectId, ref: 'EducationalProgram', require: true } ],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
