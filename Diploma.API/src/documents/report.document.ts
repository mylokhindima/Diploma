import { FileDocument } from './file.document';
import { ObjectID } from 'mongodb';
import { DiplomaDocument } from './diploma.document';
import { Document } from "mongoose";

export class ReportDocument extends Document {
    comments: string[];
    file: FileDocument | ObjectID;
    diploma: DiplomaDocument | ObjectID;
}