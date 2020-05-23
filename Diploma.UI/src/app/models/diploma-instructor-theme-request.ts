import { DiplomaInstructorRequest } from './diploma-instructor-request';

export interface DiplomaInstructorThemeRequest extends DiplomaInstructorRequest {
  theme: string;
  methodologicalCommissionApprove?: boolean;
}
