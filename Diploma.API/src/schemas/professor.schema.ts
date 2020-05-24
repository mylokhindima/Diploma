import { Role } from './../enums/role.enum';
import { Schema } from 'mongoose';
import { DepartmentMemberSchema } from './department-member.schema';

export const ProfessorSchema = new Schema({
    roles: {
        type: [Number],
        default: [Role.Professor],
        set: (roles: Role[]) => [Role.Professor, ...roles.filter(r => r !== Role.Professor)],
        enum: [
            Role.Professor, 
            Role.ResponsibleForGraduation,
            Role.MethodologicalCommitteeMember,
            Role.HeadOfDepartment,
            Role.NormController,
            Role.ResponsibleForArchiving,
            Role.ExaminationCommitteeSecretary,
            Role.PracticeLeader
        ],
    },
    capacity: {
        type: [Number]
    }
}, {
    versionKey: false,
});

ProfessorSchema.add(DepartmentMemberSchema);
