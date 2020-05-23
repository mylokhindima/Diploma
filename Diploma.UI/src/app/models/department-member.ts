import { User } from './user';

export interface DepartmentMember extends User {
  degree: number;
  departmentId: string;
  department?: any;
}
