import { EducationalForm } from '../../models/educational-form.enum';

export function formView(form: EducationalForm): string {
  switch (form) {
    case 0:
      return 'Денна';
    case 1:
      return 'Заочна';
    case 2:
      return 'Дистанційна';
  }
}
