import { ProfessorEntity } from './../+professors/professor.entity';
import { BaseEntity } from '../../base/base.entity';
import { SpecialtyEntity } from '../+specialties/specialty.entity';

export class DepartmentEntity extends BaseEntity<DepartmentEntity> {
    name: string;
    specialtiesIds: string[];
    specialties: SpecialtyEntity[];
    responsible?: ProfessorEntity;
    responsibleId?: string; 
}