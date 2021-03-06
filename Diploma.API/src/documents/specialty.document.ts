import { EducationalProgramDocument } from './educational-program.document';
import { ObjectID } from 'mongodb';
import { DepartmentDocument } from './department.document';
import { Document } from 'mongoose';

export class SpecialtyDocument extends Document {
    name: string;
    code: string;
    department: DepartmentDocument | ObjectID;
    educationalPrograms: EducationalProgramDocument[] | ObjectID[];
}