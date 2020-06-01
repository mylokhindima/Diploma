import { Student } from './student';
import { Base } from './base';
import { DiplomaProtection } from './diploma-protection';

export interface TimeSection extends Base {
  diplomaProtection?: DiplomaProtection;
  diplomaProtectionId: string;
  student?: Student;
  studentId: string;
  startTime: string;
}
