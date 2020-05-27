import { EducationalForm } from './../../enums/educational-form.enum';
import { StudentDegree } from './../../enums/student-degree.enum';
import { BaseEntity } from '../../base/base.entity';
import { SpecialtyEntity } from '../+specialties/specialty.entity';

export class EducationalProgramEntity extends BaseEntity<EducationalProgramEntity> {
    specialtyId?: string;
    specialty?: SpecialtyEntity;
    degree: StudentDegree;
    form: EducationalForm;
    duration: number;
    name: string;
} 