import { pick } from 'lodash';
import { professorMapper } from '../+professors/professor.mapper';
import { studentMapper } from '../+students/student.mapper';
import { DiplomaInstructorRequestDocument } from '../../documents/diploma-instructor-request.document';
import { StudentDocument } from '../../documents/student.document';
import { ProfessorDocument } from './../../documents/professor.document';
import { DiplomaInstructorRequestEntity } from './diploma-instructor-request.entity';

export function diplomaInstructorRequestMapper(request: DiplomaInstructorRequestDocument): DiplomaInstructorRequestEntity {
    const partial = pick(request, ['description', 'status', 'declinedComment']) as any as Partial<DiplomaInstructorRequestEntity>;

    if (request.populated('from')) {
        partial.from = studentMapper(request.from as StudentDocument);
        partial.fromId = partial.from.id;
    } else {
        partial.from = null;
        partial.fromId = partial.from.toString();
    }

    if (request.populated('to')) {
        partial.to = professorMapper(request.to as ProfessorDocument);
        partial.toId = partial.to.id;
    } else {
        partial.to = null;
        partial.toId = partial.to.toString();
    }

    return new DiplomaInstructorRequestEntity(partial);
}