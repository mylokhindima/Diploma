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
import { request } from 'express';


@Injectable()
export class DiplomaProtectionsStore {
    constructor(
        @InjectModel('DiplomaProtection') private _diplomaProtectionModel: Model<DiplomaProtectionDocument>,
        @InjectModel('TimeSection') private _timeSectionModel: Model<TimeSectionDocument>,
    ) { }
    
    public async findAll(): Promise<DiplomaProtectionEntity[]> {
        const protections = await this._diplomaProtectionModel.find().populate('educationalProgram').sort([['_id', -1]]);

        return protections.map(p => diplomaProtectionMapper(p));
    }

    public async findTimeSections(): Promise<TimeSectionEntity[]> {
        const sections = await this._timeSectionModel.find();

        return sections.map(s => timeSectionMapper(s));
    }

    public async findTimeSectionByStudentId(studentId: string): Promise<TimeSectionEntity> {
        const section = await this._timeSectionModel.findOne({
            student: studentId,
        });

        return section ? timeSectionMapper(section) : null;
    }

    public async find(id: string): Promise<DiplomaProtectionEntity> {
        const protection = await this._diplomaProtectionModel.findById(id).populate('educationalProgram');

        return diplomaProtectionMapper(protection);
    }

    public async create(dto: CreateDiplomaProtectionDTO): Promise<DiplomaProtectionEntity> {
        const diplomaProtection = await this._diplomaProtectionModel.create({
            educationalProgram: dto.educationalProgramId,
            timeStart: dto.timeStart,
            timeEnd: dto.timeEnd,
        });

        const startFrom = new Date(diplomaProtection.timeStart);

        const endTo = new Date(diplomaProtection.timeEnd);

        const requests = [];

        const to = endTo.getHours() * 60 + endTo.getMinutes();

        for (let from = startFrom.getHours() * 60 + startFrom.getMinutes(); from <= to; from += diplomaProtection.shift) {
            const time = new Date(startFrom.getTime());
            time.setMinutes(0);
            time.setHours(0);
            time.setMinutes(from);

            requests.push(this._timeSectionModel.create({
                diplomaProtection: diplomaProtection.id,
                startTime: time.toString(),
            }))
        } 

        await Promise.all(requests);

        return await this.find(diplomaProtection.id);
    }

    public async findByEducationalProgram(id: string): Promise<DiplomaProtectionEntity[]> {
        const diplomaProtections = await this._diplomaProtectionModel.find({
            educationalProgram: id,
        }).populate('educationalProgram');

        return diplomaProtections.map(diplomaProtection => diplomaProtectionMapper(diplomaProtection));
    }

    public async record(timeSectionId: string, studentId: string): Promise<TimeSectionEntity> {
        const section = await this._timeSectionModel.findByIdAndUpdate(timeSectionId, {
            student: studentId
        });

        return timeSectionMapper(section);
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
