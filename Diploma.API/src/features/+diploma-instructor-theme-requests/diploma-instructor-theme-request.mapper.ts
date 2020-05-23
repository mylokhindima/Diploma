import { pick } from 'lodash';
import { DiplomaInstructorThemeRequestDocument } from './../../documents/diploma-instructor-theme-request.document';
import { DiplomaInstructorThemeRequestEntity } from './diploma-instructor-theme-request.entity';
import { diplomaInstructorRequestMapper } from '../+diploma-instructor-requests/diploma-instructor-request.mapper';

export function diplomaInstructorThemeRequestMapper(request: DiplomaInstructorThemeRequestDocument): DiplomaInstructorThemeRequestEntity {
    const partial = pick(request, ['theme', 'methodologicalCommissionApprove']) as any as Partial<DiplomaInstructorThemeRequestEntity>;

    return new DiplomaInstructorThemeRequestEntity({
        ...partial,
        ...diplomaInstructorRequestMapper(request),
    });
}