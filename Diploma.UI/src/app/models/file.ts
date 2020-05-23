import { Base } from './base';
import { FileType } from './file-type.enum';

export interface File extends Base {
  type: FileType;
  path: string;
  name: string;
}
