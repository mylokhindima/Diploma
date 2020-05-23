import { ObjectID } from 'mongodb';
import { Document } from "mongoose";
import { FileDocument } from './file.document';

export class ArchieveDocument extends Document {
    otherFiles: FileDocument[] | ObjectID[];
    diplomaReport: FileDocument | ObjectID;
}

