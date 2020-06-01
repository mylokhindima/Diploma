import { Base } from './base';
import { EducationalProgram } from './educational-program';
import { File } from './file';

export interface Order extends Base {
    educationalProgramId: string;
    educationalProgram?: EducationalProgram;
    fileId: string;
    file?: File;
    approved?: boolean;
    startDate: string;
    endDate: string;
}
