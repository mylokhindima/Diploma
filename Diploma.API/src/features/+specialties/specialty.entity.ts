import { BaseEntity } from '../../base/base.entity';
import { DepartmentEntity } from './../+departments/department.entity';
import { EducationalProgramEntity } from './../+educational-program/educational-program.entity';

export class SpecialtyEntity extends BaseEntity<SpecialtyEntity> {
    name: string;
    code: string;
    departmentId: string; 
    department?: DepartmentEntity;
    educationalProgramsIds: string[];
    educationalPrograms: EducationalProgramEntity[]
} 