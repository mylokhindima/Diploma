import { StudentEntity } from '../../+students/student.entity';
import { BaseEntity } from '../../../base/base.entity';
import { DiplomaProtectionEntity } from './diploma-protection.entity';

export class TimeSectionEntity extends BaseEntity<TimeSectionEntity> {
    diplomaProtection?: DiplomaProtectionEntity;
    diplomaProtectionId: string;
    student?: StudentEntity;
    studentId: string;
    startTime: string;
}
