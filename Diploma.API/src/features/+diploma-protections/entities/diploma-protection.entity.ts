import { EducationalProgramEntity } from '../../+educational-program/educational-program.entity';
import { BaseEntity } from '../../../base/base.entity';

export class DiplomaProtectionEntity extends BaseEntity<DiplomaProtectionEntity> {
    educationalProgram: EducationalProgramEntity;
    educationalProgramId: string;
    timeStart: string;
    timeEnd: string;
    shift: number
}
