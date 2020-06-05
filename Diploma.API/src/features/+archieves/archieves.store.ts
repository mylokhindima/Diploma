import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArchieveDocument } from '../../documents/archive.document';
import { FilesStore } from './../+files/files.store';
import { ArchieveEntity } from './archieve.entity';
import { archiveMapper } from './archive.mapper';
import { CreateArchieveFileDTO } from './dtos/create-archieve-file.dto';
import { CreateArchieveDTO } from './dtos/create-archieve.dto';
import * as archiver from 'archiver';
import path = require('path');
import { existsSync, mkdirSync, createWriteStream, createReadStream } from 'fs';


@Injectable()
export class ArchievesStore {
    constructor(
        @InjectModel('Archieve') private _archiveModel: Model<ArchieveDocument>,
        private _filesStore: FilesStore,
    ) { }

    public async create(dto: CreateArchieveDTO): Promise<ArchieveEntity> {
        const archive = await this._archiveModel.create({
            diplomaReport: dto.diplomaReportId,
            diploma: dto.diplomaId,
        });

        return archiveMapper(archive);
    }

    public async findByDiplomaReportId(diplomaReportId: string): Promise<ArchieveEntity> {
        const archive = await this._archiveModel.findOne({
            diplomaReport: diplomaReportId,
        }).populate('diplomaReport').populate('otherFiles');

        return archiveMapper(archive);
    }

    public async find(id: string): Promise<ArchieveEntity> {
        const archive = await this._archiveModel.findById(id).populate('diplomaReport').populate('otherFiles');

        return archiveMapper(archive);
    }

    public async findAll(): Promise<ArchieveEntity[]> {
        const archives = await this._archiveModel.find().populate('diplomaReport').populate('otherFiles').populate({
            path: 'diploma',
            populate: {
                path: 'student',
            }
        });

        return archives.map(a => archiveMapper(a));
    }


    public async findByDiplomaId(id: string): Promise<ArchieveEntity> {
        const archive = await this._archiveModel.findOne({

        }).populate('diplomaReport').populate('otherFiles');

        return archiveMapper(archive);
    }

    public async saveFile(dto: CreateArchieveFileDTO, file: any): Promise<ArchieveEntity> {
        const createdFile = await this._filesStore.create({
            path: file.filename,
            type: dto.type,
            name: file.originalname,
        });

        await this._archiveModel.findByIdAndUpdate(dto.id, {
            $push: { "otherFiles": createdFile.id },
        },
            { "new": true, "upsert": true });

        return this.find(dto.id);
    }

    public async generateArchieve(id: string): Promise<archiver.Archiver> {
        const archieve = await this.find(id);

        var archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                throw err;
            }
        });

        // good practice to catch this error explicitly
        archive.on('error', function (err) {
            throw err;
        });

        archieve.otherFiles.forEach(f => {
            const a = path.resolve(process.cwd() + "/public/files/" + f.path);

            archive.append(createReadStream(a), { name: f.name });
        });

        const a = path.resolve(process.cwd() + "/public/reports/" + archieve.diplomaReport.path);
        archive.append(createReadStream(a), { name: archieve.diplomaReport.name });

        return archive;
    }
}
