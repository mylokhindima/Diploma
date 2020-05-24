import { ReportEntity } from './report.entity';
import { FilesStore } from './../+files/files.store';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Step } from '../../enums/step.enum';
import { StagesStore } from './../+stages/stages.store';
import { DiplomaDocument } from './../../documents/diploma.document';
import { ReportDocument } from './../../documents/report.document';
import { DiplomaEntity } from './diploma.entity';
import { CreateDiplomaDTO } from './dtos/create-diploma.dto';
import { SearchDiplomasQuery } from './dtos/search-diplomas-query.dto';
import { diplomaMapper } from './mappers/diploma.mapper';
import { SearchDiplomaQueryBuilder } from './searh-diploma-query.builder';
import { FileType } from '../../enums/file-type.enum';
import { reportMapper } from './mappers/report.mapper';



@Injectable()
export class DiplomaStore {
    constructor(
        @InjectModel('Diploma') private _diplomaModel: Model<DiplomaDocument>,
        @InjectModel('Report') private _reportModel: Model<ReportDocument>,
        private _stagesStore: StagesStore,
        private _filesStore: FilesStore,
    ) { }

    public async findAll(): Promise<DiplomaEntity[]> {
        const diplomas = await this._diplomaModel.find()
            .populate('student')
            .populate('instructor')
            .populate('stage')
            .populate('reports')
            .populate('mainReport')
            .sort([['_id', -1]]);
        
        return diplomas.map(s => diplomaMapper(s));
    }

    public async find(id: string): Promise<DiplomaEntity> {
        const diploma = await this._diplomaModel.findById(id)
            .populate('student')
            .populate('instructor')
            .populate('stage')
            .populate('reports')
            .populate('mainReport');
        
        return diplomaMapper(diploma);
    }

    public async filter(query: SearchDiplomasQuery): Promise<DiplomaEntity[]> {
        const builder = new SearchDiplomaQueryBuilder(this._diplomaModel)
            .setStudentId(query.studentId)
            .setProfessorId(query.instructorId)
            .setStageId(query.stageId)

        const diplomas = await builder.build();
        
        return diplomas.map(d => diplomaMapper(d));
    }

    public async addComment(reportId: string, comment: string): Promise<ReportEntity> {
        await this._reportModel.findByIdAndUpdate(reportId, { 
            $push: { "comments": comment },
        }, 
        { "new": true, "upsert": true });

        return this.findReport(reportId);
    }

    public async createReport(diplomaId: string, file: any): Promise<ReportEntity> {
        const createdFile = await this._filesStore.create({
            path: file.filename,
            type: FileType.DiplomaExplanatoryNote,
            name: file.originalname,
        });

        const createdReport = await this._reportModel.create({
            file: createdFile.id,
            diploma: diplomaId,
        });

        const report = await this.findReport(createdReport.id);

        await this._diplomaModel.findByIdAndUpdate(diplomaId, { 
            $push: { "reports": report.id },
        }, 
        { "new": true, "upsert": true });

        return report;
        
    }

    public async findReports(diplomaId: string): Promise<ReportEntity[]> {
        const reports = await this._reportModel.find({
            diploma: diplomaId,
        }).populate('file').sort([['_id', -1]]);

        return reports.map(r => reportMapper(r));
    }

    public async findReport(id: string): Promise<ReportEntity> {
        const report = await this._reportModel.findById(id).populate('file');

        return reportMapper(report);
    }


    public async updateById(id: string, model: DiplomaEntity): Promise<DiplomaEntity> {
        const diploma = await this._diplomaModel.findByIdAndUpdate(id, {
            instructor: model.instructorId,
            theme: model.theme,
            student: model.studentId,
            stage: model.stageId,
        }).populate('student').populate('professor').populate('stage')
        .populate('reports')
        .populate('mainReport');
        
        return diplomaMapper(diploma);
    }

    public async create(dto: CreateDiplomaDTO): Promise<DiplomaEntity> {
        const stage = await this._stagesStore.findByStep(Step.ChooseInstructor);

        const diploma = await this._diplomaModel.create({
            instructor: dto.instructorId,
            student: dto.studentId,
            theme: dto.theme,
            stage: stage.id,
        });

        return await this.find(diploma.id);
    }
}
