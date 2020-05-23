import { BaseEntity } from './../../base/base.entity';
import { FileType } from './../../enums/file-type.enum';

export class FileEntity extends BaseEntity<FileEntity> {
    type: FileType;
    path: string;
    name: string;
}