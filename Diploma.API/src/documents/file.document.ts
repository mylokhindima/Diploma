import { FileType } from './../enums/file-type.enum';
import { Document } from "mongoose";

export class FileDocument extends Document {
    type: FileType;
    path: string;
    name: string;
}