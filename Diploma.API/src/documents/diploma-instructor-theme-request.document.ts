import { DiplomaInstructorRequestDocument } from './diploma-instructor-request.document';

export class DiplomaInstructorThemeRequestDocument extends DiplomaInstructorRequestDocument {
    theme: string;
    methodologicalCommissionApprove?: boolean;
}