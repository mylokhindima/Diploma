import { BaseEntity } from './../../base/base.entity';
import { StageEntity } from '../+stages/stage.entity';
import { ProfessorEntity } from '../+professors/professor.entity';
import { StudentEntity } from '../+students/student.entity';
import { ReportEntity } from './report.entity';

export class DiplomaEntity extends BaseEntity<DiplomaEntity> {
    instructor?: ProfessorEntity;
    instructorId?: string; 
    theme?: string;
    student?: StudentEntity;
    studentId: string;
    stage?: StageEntity;
    stageId: string;
    reportsIds: string[];
    reports: ReportEntity[];  
    mainReportId: string;
    mainReport?: ReportEntity;
}