import { SearchPracticesDTO } from './dtos/search-practices.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { FilesStore } from '../+files/files.store';
import { FileType } from '../../enums/file-type.enum';
import { PracticeDocument } from './../../documents/practice.document';
import { CreatePracticeDTO } from './dtos/create-practice.dto';
import { PracticeEntity } from './practice.entity';
import { practiceMapper } from './practice.mapper';
import path = require('path');


@Injectable()
export class PracticesStore {
    constructor(
        @InjectModel('Practice') private _practiceModel: Model<PracticeDocument>,
        private filesStore: FilesStore,
    ) { }

    public async create(dto: CreatePracticeDTO): Promise<PracticeEntity> {
        const practice = await this._practiceModel.create({
            instructor: dto.instructorId,
            location: dto.location,
            student: dto.studentId,
        });

        return practiceMapper(practice);
    }

    public async update(dtos: PracticeEntity[]): Promise<PracticeEntity[]> {
        const practices = await Promise.all(dtos.map(dto => this._practiceModel.findByIdAndUpdate(dto.id, {
            ...dto,
            instructor: dto.instructorId,
            student: dto.studentId,
            file: dto.fileId
        })));

        return practices.map(p => practiceMapper(p)); 
    }

    public async upload(id: string, file: any): Promise<PracticeEntity> {
        const createdFile = await this.filesStore.create({
            path: file.filename,
            type: FileType.PracticeOrder,
            name: file.originalname,
        });

        await this._practiceModel.findByIdAndUpdate(id, {
            file: createdFile.id,
        });

        return await this.find(id);
    }


    public async find(id: string | ObjectID): Promise<PracticeEntity> {
        const practice = await this._practiceModel.findById(id).populate('student').populate('instructor').populate('file');

        return practiceMapper(practice);
    }

    
    public async filter(dto: SearchPracticesDTO): Promise<PracticeEntity[]> {
        let query = this._practiceModel.find();

        if (dto.instructorId) {
            query = query.find({
                instructor: dto.instructorId
            });
        }

        const practices = await query.populate('student').populate('instructor').populate('file');

        return practices.map(p => practiceMapper(p));
    }

    public async findAll(): Promise<PracticeEntity[]> {
        const practices = await this._practiceModel.find().populate('student').populate('instructor').populate('file');

        return practices.map(p => practiceMapper(p)); 
    }

    public async findByStudentId(id: string | ObjectID): Promise<PracticeEntity> {
        const practice = await this._practiceModel.findOne({
            student: id, 
        }).populate('student').populate('instructor').populate('file');

        return practice ? practiceMapper(practice) : null;
    }
}
