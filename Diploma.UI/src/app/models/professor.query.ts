import { Role } from './role.enum';
export interface ProfessorQuery {
    departmentId?: string;
    isActive?: boolean;
    role?: Role,
    available?: boolean;
}
