import { DepartmentEntity } from './../+departments/department.entity';
import { BaseEntity } from '../../base/base.entity';

export class SpecialtyEntity extends BaseEntity<SpecialtyEntity> {
    name: string;
    code: string;
    departmentId: string; 
    department?: DepartmentEntity;
} 