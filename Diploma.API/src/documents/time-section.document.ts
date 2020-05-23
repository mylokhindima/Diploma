import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
import { DiplomaProtectionDocument } from './diploma-protection.document';
import { StudentDocument } from './student.document';

export class TimeSectionDocument extends Document {
    diplomaProtection: DiplomaProtectionDocument | ObjectID;
    student: StudentDocument | ObjectID;
    startTime: string;
}
