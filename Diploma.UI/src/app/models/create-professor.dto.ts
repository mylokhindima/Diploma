import { Role } from './role.enum';
import { CreateUserDTO } from './create-user.dto';
import { ProfessorDegree } from './proffesor-degree.enum';

export interface CreateProfessorDTO extends CreateUserDTO {
  degree: ProfessorDegree;
  departmentId: string;
  roles?: Role[];
}
