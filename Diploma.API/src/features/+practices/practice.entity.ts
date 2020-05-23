import { BaseEntity } from './../../base/base.entity';
import { StudentEntity } from '../+students/student.entity';
import { FileEntity } from './../+files/file.entity';
import { ProfessorEntity } from './../+professors/professor.entity';

export class PracticeEntity extends BaseEntity<PracticeEntity> {
    instructor: ProfessorEntity;
    instructorId: string;
    location: string;
    student: StudentEntity;
    studentId: string;
    score: number;
    file: FileEntity;
    fileId: string;   
}