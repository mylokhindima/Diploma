import { ObjectID } from 'mongodb';
import { DepartmentDocument } from './department.document';
import { UserDocument } from "./user.document";

export class DeparmentMemberDocument extends UserDocument {
    degree: number;
    department: DepartmentDocument | ObjectID;
}