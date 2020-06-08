import { ObjectID } from 'mongodb';
import { ReportDocument } from '../../../documents/report.document';
import { pick } from 'lodash';
import { professorMapper } from '../../+professors/professor.mapper';
import { StudentDocument } from '../../../documents/student.document';
import { DiplomaDocument } from '../../../documents/diploma.document';
import { ProfessorDocument } from '../../../documents/professor.document';
import { StageDocument } from '../../../documents/stage.document';
import { DiplomaEntity } from '../diploma.entity';
import { studentMapper } from '../../+students/student.mapper';
import { stageMapper } from '../../+stages/stage.mapper';
import { baseMapper } from '../../../base/base.mapper';
import { reportMapper } from './report.mapper';

export function diplomaMapper(diploma: DiplomaDocument): DiplomaEntity {
    const partial = pick(diploma, ['theme']) as any as Partial<DiplomaEntity>;

    if (diploma.instructor) {
        if (diploma.populated('instructor')) {
            partial.instructor = professorMapper(diploma.instructor as ProfessorDocument);
            partial.instructorId = partial.instructor.id;
        } else {
            partial.instructor = null;
            partial.instructorId = diploma.instructor?.toString();
        }
    }

    if (diploma.student) {
        if (diploma.populated('student')) {
            partial.student = studentMapper(diploma.student as StudentDocument);
            partial.studentId = partial.student.id;
        } else {
            partial.student = null;
            partial.studentId = diploma.student.toString();
        }
    }

    if (diploma.stage) {
        if (diploma.populated('stage')) {
            partial.stage = stageMapper(diploma.stage as StageDocument);
            partial.stageId = partial.stage.id;
        } else {
            partial.stage = null;
            partial.stageId = diploma.stage.toString();
        }
    }

    if (diploma.reports && diploma.populated('reports')) {
        partial.reports = (diploma.reports as ReportDocument[]).map(s => reportMapper(s)); 
    } else {
        partial.reports = null;
        partial.reportsIds = diploma.reports ? (diploma.reports as ObjectID[]).map(s => s.toHexString()) : null;
    }

    if (diploma.populated('mainReport')) {
        partial.mainReport = reportMapper(diploma.mainReport as ReportDocument);
        partial.mainReportId = partial.mainReport.id;
    } else {
        partial.mainReport = null;
        partial.mainReportId = diploma.mainReport ? (diploma.mainReport as ObjectID).toHexString() : null;
    }
    
    return new DiplomaEntity({
        ...baseMapper(diploma),
        ...partial,
    });
}