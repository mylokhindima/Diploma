import { Step } from './step.enum';

export interface SearchStudentsDTO {
    departmentId?: string;
    step?: Step;
    isActive?: boolean;
}
