import { ObjectID } from 'mongodb';
import { SpecialtyDocument } from './specialty.document';
import { StudentDegree } from './../enums/student-degree.enum';
import { EducationalForm } from './../enums/educational-form.enum';
import { Document } from "mongoose";

export class EducationalProgramDocument extends Document {
    specialty: SpecialtyDocument | ObjectID;
    degree: StudentDegree;
    form: EducationalForm;
    duration: number;
    name: string;
}