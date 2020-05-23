import { Base } from './base';
import { Professor } from './proffesor';
import { Student } from './student';
import { File } from './file';

export interface Practice extends Base {
  instructor: Professor;
  instructorId: string;
  location: string;
  student: Student;
  studentId: string;
  score: number;
  file: File;
  fileId: string;
}
