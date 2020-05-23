import { Base } from './base';
import { EducationalProgram } from './educational-program';

export interface DiplomaProtection extends Base {
  educationalProgram: EducationalProgram;
  educationalProgramId: string;
  timeStart: string;
  timeEnd: string;
  shift: number;
}
