import { DepartmentMemberEntity } from './../+department-members/department-member.entity';
import { StudentDegree } from './../../enums/student-degree.enum';
import { EducationalProgramEntity } from '../+educational-program/educational-program.entity';

export class StudentEntity extends DepartmentMemberEntity {
    degree: StudentDegree;
    educationalProgramId: string;
    educationalProgram: EducationalProgramEntity;
    group: string;
}