import { Schema, HookNextFunction } from 'mongoose';

const autoPopulateDepartment = function(this: any, next: HookNextFunction) {
    this.populate('department', 'name _id')
    next();
};

export const DepartmentMemberSchema = new Schema({
    degree: {
        type: Number,
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    }
});

DepartmentMemberSchema
    .pre('findOne', autoPopulateDepartment)
    .pre('find', autoPopulateDepartment);
