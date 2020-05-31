import { ObjectID } from 'mongodb';
import { EducationalProgramDocument } from './../../documents/educational-program.document';
import { pick } from 'lodash';
import { departmentMapper } from '../+departments/department.mapper';
import { baseMapper } from '../../base/base.mapper';
import { DepartmentDocument } from '../../documents/department.document';
import { SpecialtyDocument } from './../../documents/specialty.document';
import { SpecialtyEntity } from "./specialty.entity";
import { educationalProgramMapper } from '../+educational-program/educational-program.mapper';

export function specialtyMapper(specialty: SpecialtyDocument): SpecialtyEntity {
    const isDepartmentPopulated = specialty.populated('department');

    const partial = {
        ...baseMapper(specialty),
        ...pick(specialty, ['name', 'code'])
    } as any as Partial<SpecialtyEntity>;

    if (isDepartmentPopulated) {
        const department = (specialty.department as DepartmentDocument);

        partial.departmentId = department.id;
        partial.department = departmentMapper(department);
    } else {    
        partial.departmentId = specialty.department.toString();
        partial.department = null;
    }

    if (specialty.educationalPrograms && specialty.populated('educationalPrograms')) {
        partial.educationalPrograms = (specialty.educationalPrograms as EducationalProgramDocument[]).map(s => educationalProgramMapper(s)); 
    } else {
        partial.educationalPrograms = null;
        partial.educationalProgramsIds = specialty.educationalPrograms ? (specialty.educationalPrograms as ObjectID[]).map(s => s.toHexString()) : null;
    }

    return new SpecialtyEntity(partial);
}