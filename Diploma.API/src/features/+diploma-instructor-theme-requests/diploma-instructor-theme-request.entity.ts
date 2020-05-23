import { DiplomaInstructorRequestEntity } from './../+diploma-instructor-requests/diploma-instructor-request.entity';

export class DiplomaInstructorThemeRequestEntity extends DiplomaInstructorRequestEntity {
    theme: string;
    methodologicalCommissionApprove?: boolean;
}