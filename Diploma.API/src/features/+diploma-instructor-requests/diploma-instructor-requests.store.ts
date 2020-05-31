import { MailerService } from '@nestjs-modules/mailer';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil } from 'lodash';
import { Model } from 'mongoose';
import { DiplomaStore } from '../+diplomas/diplomas.store';
import { Step } from '../../enums/step.enum';
import { DiplomaInstructorRequestDocument } from './../../documents/diploma-instructor-request.document';
import { RequestStatus } from './../../enums/request-status.enum';
import { DiplomaInstructorRequestEntity } from './diploma-instructor-request.entity';
import { diplomaInstructorRequestMapper } from './diploma-instructor-request.mapper';
import { CreateDiplomaInstructorRequest } from './dtos/create-diploma-instructor-request.dto';
import { SearchRequestsQuery } from './dtos/search-requests-query';
import { DeclineRequestDTO } from './models/decline-request.dto';

@Injectable()
export class DiplomaInstructorRequestsStore {
    constructor(
        @InjectModel('DiplomaInstructorRequest') private _diplomaInstructorRequestModel: Model<DiplomaInstructorRequestDocument>,
        private _diplomasStore: DiplomaStore,
        private readonly mailerService: MailerService,
    ) { }

    public async findAll(): Promise<DiplomaInstructorRequestEntity[]> {
        const requests = await this._diplomaInstructorRequestModel.find().where('__t', undefined).populate('from').populate('to').sort([['_id', -1]]);
        
        return requests.map(s => diplomaInstructorRequestMapper(s));
    }

    public async filter(query: SearchRequestsQuery): Promise<DiplomaInstructorRequestEntity[]> {
        let req = this._diplomaInstructorRequestModel.find();

        if (!isNil(query.toId)) {
            req = req.find({ to: query.toId });
        }

        if (!isNil(query.fromId)) {
            req = req.find({ from: query.fromId });
        }

        if (!isNil(query.statuses)) {
            req = req.find({ status: { "$in" : query.statuses} });
        }

        const requests = await req.where('__t', undefined).populate('from').populate('to').sort([['_id', -1]]);
        
        return requests.map(s => diplomaInstructorRequestMapper(s));

    }

    public async find(id: string): Promise<DiplomaInstructorRequestEntity> {
        const request = await this._diplomaInstructorRequestModel.findById(id).populate('from').populate('to');

        return request ? diplomaInstructorRequestMapper(request) : null;
    }

    public async accept(id: string, professorId: string): Promise<void> {
        const request = await this._getRequestForChange(id, professorId);

        await this._diplomaInstructorRequestModel.findByIdAndUpdate(id, {
            status: RequestStatus.Accepted
        });

        const diploma = (await this._diplomasStore.filter({
            studentId: request.fromId,
        }))[0];

        diploma.instructorId = professorId;

        await this._diplomasStore.updateById(diploma.id, diploma);

        await this._diplomasStore.updateDiplomaStage(diploma.id, Step.InstructorThemeChecking);

        this.mailerService.sendMail({
            to: diploma.student.email, 
            from: process.env.EMAIL, 
            subject: 'Request was accepted!', 
            text: `Request for management of attestation work was accepeted by ${request.to.name}.`,
            html: `Request for management of attestation work was accepeted by <strong>${request.to.name}</strong>.`,
          }).then();
    }
    
    public async decline(dto: DeclineRequestDTO, professorId: string): Promise<void> {
        const request = await this._getRequestForChange(dto.requestId, professorId);

        await this._diplomaInstructorRequestModel.findByIdAndUpdate(dto.requestId, {
            status: RequestStatus.Closed,
            declinedComment: dto.comment,
        });

        const diploma = (await this._diplomasStore.filter({
            studentId: request.fromId,
        }))[0];

        this.mailerService.sendMail({
            to: diploma.student.email, 
            from: process.env.EMAIL, 
            subject: 'Request was declined!', 
            text: `Request for management of attestation work was declined by ${request.to.name}.`,
            html: `Request for management of attestation work was declined by <strong>${request.to.name}</strong>.`,
          }).then();
    }

    public async create(dto: CreateDiplomaInstructorRequest): Promise<DiplomaInstructorRequestEntity> {
        const request = await this._diplomaInstructorRequestModel.create({
            description: dto.description,
            to: dto.toId,
            from: dto.fromId,
        });

        const res = await this.find(request.id);

        this.mailerService.sendMail({
            to: res.to.email, 
            from: process.env.EMAIL, 
            subject: 'New Request!', 
            text: `Request for management of attestation work. You have new request from ${res.from.name}. `,
            html: `Request for management of attestation work. You have new request from <strong>${res.from.name}</strong> `,
          }).then();

        return res;
    }

    private async _getRequestForChange(id: string, professorId: string): Promise<DiplomaInstructorRequestEntity> {
        const request: DiplomaInstructorRequestEntity = await this.find(id);

        const instructorId = request.toId;

        if (instructorId !== professorId) {
            throw new ForbiddenException();
        } 

        return request;
    }
}
