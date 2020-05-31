import { EducationalProgram } from './educational-program';
import { Base } from './base';
import { Department } from './department';

export interface Specialty extends Base {
  name: string;
  code: string;
  departmentId: string;
  department?: Department;
  educationalPrograms?: EducationalProgram[];
  educationalProgramsIds?: string[];
}
