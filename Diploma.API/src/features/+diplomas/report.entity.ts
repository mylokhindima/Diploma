import { BaseEntity } from './../../base/base.entity';
import { DiplomaEntity } from './diploma.entity';
import { FileEntity } from './../+files/file.entity';

export class ReportEntity extends BaseEntity<ReportEntity>  {
    comments: string[];
    fileId: string;
    file?: FileEntity;
    diplomaId: string;
    diploma: DiplomaEntity
}