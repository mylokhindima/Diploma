import { Role } from './../enums/role.enum';
import { Schema } from 'mongoose';
import { DepartmentMemberSchema } from './department-member.schema';

export const StudentSchema = new Schema({
    roles: {
        type: [Number],
        default: [Role.Student],
        immutable: true,
        required: true,
    },
    educationalProgram: {
        type: Schema.Types.ObjectId,
        ref: 'EducationalProgram',
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
});

StudentSchema.add(DepartmentMemberSchema);

 
