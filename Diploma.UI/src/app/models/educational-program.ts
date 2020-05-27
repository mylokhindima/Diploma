import { Base } from './base';
import { StudentDegree } from './student-degree.enum';
import { EducationalForm } from './educational-form.enum';
import { Specialty } from './specialty';

export interface EducationalProgram extends Base {
  specialtyId?: string;
  specialty?: Specialty;
  degree: StudentDegree;
  form: EducationalForm;
  duration: number;
  name: string;
}
