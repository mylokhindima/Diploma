import { DepartmentMember } from './department-member';
import { ProfessorDegree } from './proffesor-degree.enum';

export interface Professor extends DepartmentMember {
  degree: ProfessorDegree;
}
