import { StudentDegree } from './student-degree.enum';
import { CreateUserDTO } from './create-user.dto';

export interface CreateStudentDTO extends CreateUserDTO {
  degree: StudentDegree;
  educationalProgramId: string;
  group: string;
  name: string;
  email: string;
}
