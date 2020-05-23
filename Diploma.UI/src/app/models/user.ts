import { Role } from './role.enum';
import { Base } from './base';

export interface User extends Base {
  name: string;
  email: string;
  roles: Role[];
  isActive: boolean;
}
