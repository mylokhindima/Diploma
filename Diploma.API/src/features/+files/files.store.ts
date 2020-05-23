import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument } from './../../documents/file.document';
import { CreateFileDTO } from './dto/create-file.dto';
import { FileEntity } from './file.entity';
import { fileMapper } from './file.mapper';



@Injectable()
export class FilesStore {
    constructor(
        @InjectModel('File') private _fileModel: Model<FileDocument>,
    ) { }

    public async create(dto: CreateFileDTO): Promise<FileEntity> {
        const file = await this._fileModel.create(dto);

        return fileMapper(file);
    }
}
