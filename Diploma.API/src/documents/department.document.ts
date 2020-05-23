import { ObjectID } from 'mongodb';
import { SpecialtyDocument } from './specialty.document';
import { Document, Schema } from 'mongoose';

export class DepartmentDocument extends Document { 
    name: string;
    specialties: SpecialtyDocument[] | ObjectID[];
}