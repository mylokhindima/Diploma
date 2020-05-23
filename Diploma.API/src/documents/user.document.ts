import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

export class UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    roles: Role[];
    isActive: boolean;
    salt: string;
    hash: string;
}