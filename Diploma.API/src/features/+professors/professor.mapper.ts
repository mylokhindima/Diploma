import { ProfessorDocument } from './../../documents/professor.document';
import { ProfessorEntity } from './professor.entity';
import { departmentMemberMapper } from '../+department-members/department-member.mapper';

export function professorMapper(professor: ProfessorDocument): ProfessorEntity {
    const entity = new ProfessorEntity(departmentMemberMapper(professor));

    entity.capacity = professor.capacity;

    return entity;
}