import { Base } from './base';
import { Professor } from './proffesor';
import { Student } from './student';
import { Stage } from './stage';

export interface Diploma extends Base {
  instructor?: Professor;
  instructorId?: string;
  theme?: string;
  student?: Student;
  studentId: string;
  stage?: Stage;
  stageId: string;
}
