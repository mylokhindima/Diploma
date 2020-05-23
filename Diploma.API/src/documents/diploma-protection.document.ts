import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
import { EducationalProgramDocument } from './educational-program.document';

export class DiplomaProtectionDocument extends Document {
    educationalProgram: EducationalProgramDocument | ObjectID;
    timeStart: string;
    timeEnd: string;
    shift: number;
}
