import { StudentEntity } from './../+students/student.entity';
import { RequestStatus } from './../../enums/request-status.enum';
import { BaseEntity } from './../../base/base.entity';
import { ProfessorEntity } from '../+professors/professor.entity';

export class DiplomaInstructorRequestEntity extends BaseEntity<DiplomaInstructorRequestEntity> {
    from: StudentEntity;
    fromId: string;
    to: ProfessorEntity;
    toId: string;
    status: RequestStatus;
    description: string;
    declinedComment?: string;
}