import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
import { FileDocument } from './file.document';
import { ProfessorDocument } from './professor.document';
import { StudentDocument } from './student.document';

export class PracticeDocument extends Document {
    instructor: ProfessorDocument | ObjectID;
    location: string;
    student: StudentDocument | ObjectID; 
    score?: number;
    file?: FileDocument | ObjectID;
}
