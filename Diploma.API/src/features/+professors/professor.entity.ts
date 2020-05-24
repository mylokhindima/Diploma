import { ProfessorDegree } from './../../enums/proffesor-degree.enum';
import { DepartmentMemberEntity } from './../+department-members/department-member.entity';

export class ProfessorEntity extends DepartmentMemberEntity {
    degree: ProfessorDegree;
    capacity?: number;
}