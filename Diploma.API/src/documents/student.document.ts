import { ObjectID } from 'mongodb';
import { DeparmentMemberDocument } from './department-member.document';
import { StudentDegree } from '../enums/student-degree.enum';
import { EducationalProgramDocument } from './educational-program.document';

export class StudentDocument extends DeparmentMemberDocument {
    degree: StudentDegree;
    educationalProgram: EducationalProgramDocument | ObjectID;
    group: string;
}