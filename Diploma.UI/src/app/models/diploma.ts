import { Base } from './base';
import { Professor } from './proffesor';
import { Student } from './student';
import { Stage } from './stage';
import { DiplomaReport } from './diploma-report';

export interface Diploma extends Base {
  instructor?: Professor;
  instructorId?: string;
  theme?: string;
  student?: Student;
  studentId: string;
  stage?: Stage;
  stageId: string;
  mainReport: DiplomaReport;
  mainReportId: string;
}
