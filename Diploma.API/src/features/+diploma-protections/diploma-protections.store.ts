import { TimeSectionDocument } from './../../documents/time-section.document';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiplomaProtectionDocument } from './../../documents/diploma-protection.document';
import { DiplomaProtectionEntity } from './entities/diploma-protection.entity';
import { diplomaProtectionMapper } from './mappers/diploma-protection.mapper';
import { CreateDiplomaProtectionDTO } from './dtos/create-diploma-protection.dto';
import path = require('path');
import { CreateTimeSectionDTO } from './dtos/create-time-section.dto';
import { TimeSectionEntity } from './entities/time-section.entity';
import { timeSectionMapper } from './mappers/time-section.mapper';


@Injectable()
export class DiplomaProtectionsStore {
    constructor(
        @InjectModel('DiplomaProtection') private _diplomaProtectionModel: Model<DiplomaProtectionDocument>,
        @InjectModel('TimeSection') private _timeSectionModel: Model<TimeSectionDocument>,
    ) { }

    public async create(dto: CreateDiplomaProtectionDTO): Promise<DiplomaProtectionEntity> {
        const diplomaProtection = await this._diplomaProtectionModel.create({
            educationalProgram: dto.educationalProgramId,
            timeStart: dto.timeStart,
            timeEnd: dto.timeEnd,
        });

        return diplomaProtectionMapper(diplomaProtection);
    }

    public async findByEducationalProgram(id: string): Promise<DiplomaProtectionEntity[]> {
        const diplomaProtections = await this._diplomaProtectionModel.find({
            educationalProgram: id,
        });

        return diplomaProtections.map(diplomaProtection => diplomaProtectionMapper(diplomaProtection));
    }

    public async createTimeSection(dto: CreateTimeSectionDTO): Promise<TimeSectionEntity> {
        const timeSection = await this._timeSectionModel.create({
            diplomaProtection: dto.diplomaProtectionId,
            startTime: dto.startTime,
            student: dto.studentId,
        });

        return timeSectionMapper(timeSection);
    }
}