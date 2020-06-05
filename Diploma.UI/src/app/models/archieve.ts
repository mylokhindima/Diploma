import { DiplomaReport } from './diploma-report';
import { Base } from './base';
import { Diploma } from './diploma';
import { File } from './file';

export interface Archieve extends Base {
  diploma?: Diploma;
  diplomaId: string;
  diplomaReport?: DiplomaReport;
  diplomaReportId: string;
  otherFiles: File[];
  otherFilesIds: string[];
}
