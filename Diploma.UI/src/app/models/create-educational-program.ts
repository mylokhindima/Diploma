import { StudentDegree } from './student-degree.enum';
import { EducationalForm } from './educational-form.enum';

export class CreateEducationalProgramDTO {
    specialtyId: string;
    degree: StudentDegree;
    form: EducationalForm;
    duration: number;
    name: string;
}
