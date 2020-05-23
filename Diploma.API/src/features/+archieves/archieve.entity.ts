import { BaseEntity } from './../../base/base.entity';
import { FileEntity } from './../+files/file.entity';
export class ArchieveEntity extends BaseEntity<ArchieveEntity> {
    otherFiles: FileEntity[];
    otherFilesIds: string[];
    diplomaReport: FileEntity;
    diplomaReportId: string;
}