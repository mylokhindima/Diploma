import { Schema } from 'mongoose';

export const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    specialties: [ { type: Schema.Types.ObjectId, ref: 'Specialty', require: true } ],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
});
