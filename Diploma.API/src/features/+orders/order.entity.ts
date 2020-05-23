import { FileEntity } from '../+files/file.entity';
import { EducationalProgramEntity } from './../+educational-program/educational-program.entity';
import { BaseEntity } from './../../base/base.entity';
export class OrderEntity extends BaseEntity<OrderEntity> {
    educationalProgramId: string;
    educationalProgram?: EducationalProgramEntity;
    fileId: string;
    file?: FileEntity;
    approved?: boolean;
    startDate: string;
    endDate: string;
}