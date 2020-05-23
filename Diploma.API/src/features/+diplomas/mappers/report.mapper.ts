import { pick } from 'lodash';
import { fileMapper } from '../../+files/file.mapper';
import { baseMapper } from '../../../base/base.mapper';
import { DiplomaDocument } from './../../../documents/diploma.document';
import { FileDocument } from './../../../documents/file.document';
import { ReportDocument } from './../../../documents/report.document';
import { ReportEntity } from './../report.entity';
import { diplomaMapper } from './diploma.mapper';

export function reportMapper(report: ReportDocument): ReportEntity {
    const partial: Partial<ReportEntity> = pick(report, ['comments']) as any as ReportEntity;

    if (report.populated('file')) {
        const file = report.file as FileDocument;

        partial.file = fileMapper(file);
        partial.fileId = partial.file.id;
    } else {
        partial.fileId = report.file.toString();
        partial.file = null;
    }

    if (report.populated('diploma')) {
        const diploma = report.diploma as DiplomaDocument;

        partial.diploma = diplomaMapper(diploma);
        partial.diplomaId = partial.file.id;
    } else {
        partial.diplomaId = report.diploma.toString();
        partial.diploma = null;
    }

    return new ReportEntity({
        ...baseMapper(report),
        ...partial
    });
}