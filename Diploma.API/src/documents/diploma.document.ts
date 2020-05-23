import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
import { ProfessorDocument } from './professor.document';
import { StageDocument } from './stage.document';
import { StudentDocument } from './student.document';
import { ReportDocument } from './report.document';

export class DiplomaDocument extends Document { 
    instructor: ProfessorDocument | ObjectID;
    theme: string;
    student: StudentDocument | ObjectID;
    stage: StageDocument | ObjectID;
    reports: ReportDocument[] | ObjectID[];
    mainReport: ReportDocument | ObjectID;
}