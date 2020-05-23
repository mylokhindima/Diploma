import { DepartmentMember } from './department-member';
import { EducationalProgram } from './educational-program';
import { StudentDegree } from './student-degree.enum';

export interface Student extends DepartmentMember {
  degree: StudentDegree;
  educationalProgramId: string;
  educationalProgram: EducationalProgram;
  group: string;
}
