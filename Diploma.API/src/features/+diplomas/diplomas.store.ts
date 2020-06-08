import { StageDocument } from './../../documents/stage.document';
import { UpdateDiplomaDTO } from './dtos/update-diploma.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileType } from '../../enums/file-type.enum';
import { Step } from '../../enums/step.enum';
import { ArchievesStore } from './../+archieves/archieves.store';
import { FilesStore } from './../+files/files.store';
import { StagesStore } from './../+stages/stages.store';
import { DiplomaDocument } from './../../documents/diploma.document';
import { ReportDocument } from './../../documents/report.document';
import { DiplomaEntity } from './diploma.entity';
import { CreateDiplomaDTO } from './dtos/create-diploma.dto';
import { SearchDiplomaReports } from './dtos/search-diploma-reports.dto';
import { SearchDiplomasQuery } from './dtos/search-diplomas-query.dto';
import { diplomaMapper } from './mappers/diploma.mapper';
import { reportMapper } from './mappers/report.mapper';
import { ReportEntity } from './report.entity';
import { SearchDiplomaQueryBuilder } from './searh-diploma-query.builder';



@Injectable()
export class DiplomaStore {
    constructor(
        @InjectModel('Diploma') private _diplomaModel: Model<DiplomaDocument>,
        @InjectModel('Report') private _reportModel: Model<ReportDocument>,
        private _stagesStore: StagesStore,
        private _filesStore: FilesStore,
        private _archievesStore: ArchievesStore,
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

    public async createMainReport(diplomaId: string, file: any): Promise<ReportEntity> {
        const diploma = await this.find(diplomaId);

        let report: ReportEntity = diploma.mainReportId && await this.findReport(diploma.mainReportId);

        if (report) {
            await this._filesStore.delete(report.fileId, 'reports');

            const createdFile = await this._filesStore.create({
                path: file.filename,
                type: FileType.DiplomaExplanatoryNote,
                name: file.originalname,
            });

            await this._reportModel.findByIdAndUpdate(report.id, { 
                file: createdFile.id,
            });

            report.fileId = createdFile.id;
            report.file = createdFile;
        } else {
            report = await this._createReport(diplomaId, file);

            await this._diplomaModel.findByIdAndUpdate(diplomaId, { 
                mainReport: report.id,
            });
        }

        return report;
    }

    public async createReport(diplomaId: string, file: any): Promise<ReportEntity> {
        const report = await this._createReport(diplomaId, file);

        await this._diplomaModel.findByIdAndUpdate(diplomaId, { 
            $push: { "reports": report.id },
        }, 
        { "new": true, "upsert": true });

        return report;
    }

    public async updateMany(dtos: UpdateDiplomaDTO[]): Promise<DiplomaEntity[]> {
        const requests = dtos.map(dto => {
            return this._diplomaModel.findByIdAndUpdate(dto.id, {
                theme: dto.theme,
                instructor: dto.instructorId,
            }).populate('stage').then(doc => {
                if (dto.theme && dto.instructorId && (doc.stage as StageDocument).step < Step.PracticeDistribution) {
                    return this.updateDiplomaStage(doc.id, Step.PracticeDistribution);
                }
            });
        });

        await Promise.all(requests);

        return await Promise.all(dtos.map(dto => this.find(dto.id)));
    }

    public async findReports(diplomaId: string): Promise<ReportEntity[]> {
        const reports = await this._reportModel.find({
            diploma: diplomaId,
        }).populate('file').sort([['_id', -1]]);

        const diploma = await this.find(diplomaId);

        return reports.map(r => reportMapper(r)).filter(r => diploma.mainReportId !== r.id);
    }

    public async filterMainReports(query: SearchDiplomaReports): Promise<ReportEntity[]> {
        let stageId: string;
        
        if (query.step) {
            stageId = (await this._stagesStore.findByStep(query.step)).id;
        }
        
        let diplomas = await this.filter({
            instructorId: query.instructorId,
            stageId,
        });

        return await Promise.all(diplomas.filter(d => d.mainReportId).map(d => this.findReport(d.mainReportId)));
    }

    public async acceptByInstructor(diplomaId: string): Promise<void> {
        await this.updateDiplomaStage(diplomaId, Step.Plagiarism);
    }

    public async passPlagiarism(diplomaId: string): Promise<void> {
        await this.updateDiplomaStage(diplomaId, Step.Normscontrol);
    }

    public async failPlagiarism(diplomaId: string): Promise<void> {
        await this.updateDiplomaStage(diplomaId, Step.DiplomaReport);
    }

    public async passNormscontrol(diplomaId: string): Promise<void> {
        await this.updateDiplomaStage(diplomaId, Step.Graduation);

        const diploma = await this.find(diplomaId);

        await this._archievesStore.create({
            diplomaId: diploma.id,
            diplomaReportId: diploma.mainReport.fileId,
        });
    }

    public async failNormscontrol(diplomaId: string): Promise<void> {
        await this.updateDiplomaStage(diplomaId, Step.Plagiarism);
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

    public async updateDiplomaStage(id: string, step: Step): Promise<DiplomaEntity> {
        const stage = await this._stagesStore.findByStep(step);
    
        const diploma = await this.find(id);

        diploma.stageId = stage.id;
        diploma.stage = stage;

        return await this.updateById(id, diploma);
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

    private async _createReport(diplomaId: string, file: any): Promise<ReportEntity> {
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

        return report;
    }
}
