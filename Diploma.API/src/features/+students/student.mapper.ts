import { EducationalProgramDocument } from './../../documents/educational-program.document';
import { StudentEntity } from './student.entity';
import { StudentDocument } from '../../documents/student.document';
import { departmentMemberMapper } from '../+department-members/department-member.mapper';
import { educationalProgramMapper } from '../+educational-program/educational-program.mapper';
import { pick } from 'lodash';

export function studentMapper(student: StudentDocument): StudentEntity {
    const departmentMember = departmentMemberMapper(student);

    const partial = { ...departmentMember, ...pick(student, ['group']) }  as Partial<StudentEntity>;

    if (student.populated('educationalProgram')) {
        partial.educationalProgram = educationalProgramMapper(student.educationalProgram as EducationalProgramDocument);
        partial.educationalProgramId = partial.educationalProgram.id;
    } else {
        partial.educationalProgram = null;
        partial.educationalProgramId = student.educationalProgram.toString();
    }
    
    return new StudentEntity(partial);
}