import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
import { EducationalProgramDocument } from './educational-program.document';
import { FileDocument } from './file.document';

export class OrderDocument extends Document { 
    educationalProgram: EducationalProgramDocument | ObjectID; 
    file?: FileDocument | ObjectID;
    approved?: boolean;
    startDate: Date;
    endDate: Date;
}