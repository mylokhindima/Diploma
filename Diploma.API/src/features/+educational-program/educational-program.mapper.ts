import { baseMapper } from '../../base/base.mapper';
import { pick } from 'lodash';
import { SpecialtyDocument } from './../../documents/specialty.document';
import { EducationalProgramDocument } from './../../documents/educational-program.document';
import { EducationalProgramEntity } from './educational-program.entity';
import { specialtyMapper } from '../+specialties/specialty.mapper';

export function educationalProgramMapper(educationalProgram: EducationalProgramDocument): EducationalProgramEntity {
    const isSpecialtyPopulated = educationalProgram.populated('specialty');

    const partial: Partial<EducationalProgramEntity> = pick(educationalProgram, ['degree', 'form', 'duration', 'name']) as any as EducationalProgramEntity;

    if (isSpecialtyPopulated) {
        const specialty = educationalProgram.specialty as SpecialtyDocument;

        partial.specialty = specialtyMapper(specialty);
        partial.specialtyId = partial.specialty.id;
    } else {
        partial.specialtyId = educationalProgram.specialty.toString();
        partial.specialty = null;
    }

    return new EducationalProgramEntity({
        ...baseMapper(educationalProgram),
        ...partial
    });
}