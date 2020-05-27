import { FileType } from './file-type.enum';

export interface CreateFileDTO {
  type: FileType;
  path: string;
  name: string;
}
