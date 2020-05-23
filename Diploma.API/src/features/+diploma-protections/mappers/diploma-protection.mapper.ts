import { pick } from 'lodash';
import { educationalProgramMapper } from '../../+educational-program/educational-program.mapper';
import { baseMapper } from '../../../base/base.mapper';
import { DiplomaProtectionDocument } from '../../../documents/diploma-protection.document';
import { EducationalProgramDocument } from '../../../documents/educational-program.document';
import { DiplomaProtectionEntity } from '../entities/diploma-protection.entity';

export function diplomaProtectionMapper(diplomaProtection: DiplomaProtectionDocument): DiplomaProtectionEntity {
    const partial = {
        ...baseMapper(diplomaProtection),
        ...pick(diplomaProtection, ['timeStart', 'timeEnd'])
    } as any as Partial<DiplomaProtectionEntity>;

    if (diplomaProtection.populated('educationalProgram')) {
        const educationalProgram = (diplomaProtection.educationalProgram as EducationalProgramDocument);

        partial.educationalProgramId = educationalProgram.id;
        partial.educationalProgram = educationalProgramMapper(educationalProgram);
    } else {        
        partial.educationalProgramId = diplomaProtection.educationalProgram.toString();
        partial.educationalProgram = null;
    }

    return new DiplomaProtectionEntity(partial);
}