import { Base } from './base';
import { Student } from './student';
import { Professor } from './proffesor';
import { RequestStatus } from './request-status.enum';

export interface DiplomaInstructorRequest extends Base {
  from?: Student;
  fromId: string;
  to?: Professor;
  toId: string;
  status: RequestStatus;
  description: string;
  declinedComment?: string;
}
