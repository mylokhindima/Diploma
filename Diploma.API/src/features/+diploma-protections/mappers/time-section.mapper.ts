import { pick } from 'lodash';
import { StudentDocument } from '../../../documents/student.document';
import { TimeSectionDocument } from '../../../documents/time-section.document';
import { studentMapper } from '../../../features/+students/student.mapper';
import { baseMapper } from '../../../base/base.mapper';
import { DiplomaProtectionEntity } from '../entities/diploma-protection.entity';
import { TimeSectionEntity } from '../entities/time-section.entity';
import { DiplomaProtectionDocument } from './../../../documents/diploma-protection.document';
import { diplomaProtectionMapper } from './diploma-protection.mapper';

export function timeSectionMapper(timeSection: TimeSectionDocument): TimeSectionEntity {
    const partial = {
        ...baseMapper(timeSection),
        ...pick(timeSection, ['startTime'])
    } as any as Partial<TimeSectionEntity>;

    if (timeSection.student && timeSection.populated('student')) {
        const student = (timeSection.student as StudentDocument);

        partial.studentId = student.id;
        partial.student = studentMapper(student);
    } else if (timeSection.student) {        
        partial.studentId = timeSection.student.toString();
        partial.student = null;
    }

    if (timeSection.populated('diplomaProtection')) {
        const diplomaProtection = (timeSection.diplomaProtection as DiplomaProtectionDocument);

        partial.diplomaProtectionId = diplomaProtection.id;
        partial.diplomaProtection = diplomaProtectionMapper(diplomaProtection);
    } else {        
        partial.diplomaProtectionId = timeSection.diplomaProtection.toString();
        partial.diplomaProtection = null;
    }

    return new TimeSectionEntity(partial);
}