import { ObjectID } from 'mongodb';
import { SpecialtyDocument } from './../../documents/specialty.document';
import { DepartmentDocument } from '../../documents/department.document';
import { DepartmentEntity } from './department.entity';
import { pick } from 'lodash';
import { specialtyMapper } from '../+specialties/specialty.mapper';
import { baseMapper } from '../../base/base.mapper';

export function departmentMapper(department: DepartmentDocument): DepartmentEntity {
    const partial = { 
        ...baseMapper(department),
        ...pick(department, ['name']),
    } as any as Partial<DepartmentEntity>;
    
    if (department.specialties && department.populated('specialties')) {
        partial.specialties = (department.specialties as SpecialtyDocument[]).map(s => specialtyMapper(s)); 
    } else {
        partial.specialties = null;
        partial.specialtiesIds = department.specialties ? (department.specialties as ObjectID[]).map(s => s.toHexString()) : null;
    }

    return new DepartmentEntity(partial);
}