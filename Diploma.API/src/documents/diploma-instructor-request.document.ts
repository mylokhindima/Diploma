import { ObjectID } from 'mongodb';
import { Document } from "mongoose";
import { RequestStatus } from './../enums/request-status.enum';
import { ProfessorDocument } from './professor.document';
import { StudentDocument } from './student.document';

export class DiplomaInstructorRequestDocument extends Document {
    from: StudentDocument | ObjectID;
    to: ProfessorDocument | ObjectID;
    status: RequestStatus;
    declinedComment: string; 
}