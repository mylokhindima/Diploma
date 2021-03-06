import { DiplomaDocument } from './../../documents/diploma.document';
import { ObjectID } from 'mongodb';
import { ArchieveDocument } from "../../documents/archive.document";
import { fileMapper } from '../+files/file.mapper';
import { baseMapper } from "../../base/base.mapper";
import { FileDocument } from './../../documents/file.document';
import { ArchieveEntity } from "./archieve.entity";
import { diplomaMapper } from '../+diplomas/mappers/diploma.mapper';

export function archiveMapper(archive: ArchieveDocument): ArchieveEntity {
    const partial = { 
        ...baseMapper(archive),
    } as any as Partial<ArchieveEntity>;
    
    if (archive.otherFiles && archive.populated('otherFiles')) {
        partial.otherFiles = (archive.otherFiles as FileDocument[]).map(s => fileMapper(s)); 
    } else {
        partial.otherFiles = null;
        partial.otherFilesIds = archive.otherFiles ? (archive.otherFiles as ObjectID[]).map(s => s.toHexString()) : null;
    }

    if (archive.populated('diploma')) {
        partial.diploma = diplomaMapper(archive.diploma as DiplomaDocument);
        partial.diplomaId = partial.diploma.id
    } else {
        partial.diplomaId = (archive.diploma as ObjectID).toString();
        partial.diploma = null;
    }

    if (archive.populated('diplomaReport')) {
        const diplomaReport = archive.diplomaReport as FileDocument;

        partial.diplomaReport = fileMapper(diplomaReport);
        partial.diplomaReportId = partial.diplomaReport.id;
    } else {
        partial.diplomaReportId = archive.diplomaReport.toString();
        partial.diplomaReport = null;
    }

    return new ArchieveEntity(partial);
}