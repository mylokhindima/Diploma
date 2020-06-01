import { pick } from 'lodash';
import { StudentDocument } from '../../documents/student.document';
import { fileMapper } from '../+files/file.mapper';
import { professorMapper } from '../+professors/professor.mapper';
import { studentMapper } from '../+students/student.mapper';
import { baseMapper } from '../../base/base.mapper';
import { FileDocument } from './../../documents/file.document';
import { PracticeDocument } from './../../documents/practice.document';
import { ProfessorDocument } from './../../documents/professor.document';
import { PracticeEntity } from './practice.entity';

export function practiceMapper(practice: PracticeDocument): PracticeEntity {
    const partial = {
        ...baseMapper(practice),
        ...pick(practice, ['location', 'score'])
    } as any as Partial<PracticeEntity>;

    if (practice.populated('instructor')) {
        const instructor = (practice.instructor as ProfessorDocument);

        partial.instructorId = instructor.id;
        partial.instructor = professorMapper(instructor);
    } else if(practice.instructor) {    
        partial.instructorId = practice.instructor.toString();
        partial.instructor = null;
    }

    if (practice.populated('student')) {
        const student = (practice.student as StudentDocument);

        partial.studentId = student.id;
        partial.student = studentMapper(student);
    } else {    
        partial.studentId = practice.student.toString();
        partial.student = null;
    }

    if (practice.file && practice.populated('file')) {
        const file = (practice.file as FileDocument);

        partial.fileId = file.id;
        partial.file = fileMapper(file);
    } else if (practice.file) {    
        partial.fileId = practice.file.toString();
        partial.file = null;
    }

    return new PracticeEntity(partial);
}