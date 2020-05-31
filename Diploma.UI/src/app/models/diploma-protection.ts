import { Base } from './base';
import { EducationalProgram } from './educational-program';

export interface DiplomaProtection extends Base {
  educationalProgram: EducationalProgram;
  educationalProgramId: string;
  timeStart: string | Date;
  timeEnd: string | Date;
  shift: number;
}
