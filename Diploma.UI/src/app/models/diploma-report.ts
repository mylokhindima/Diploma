import { Base } from './base';
import { File } from './file';
import { Diploma } from './diploma';

export interface DiplomaReport extends Base {
  comments: string[];
  fileId: string;
  file?: File;
  diplomaId: string;
  diploma: Diploma;
}
