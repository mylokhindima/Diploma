import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil } from 'lodash';
import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { SearchRequestsQuery } from '../+diploma-instructor-requests/dtos/search-requests-query';
import { Role } from '../../enums/role.enum';
import { DeclineRequestDTO } from './../+diploma-instructor-requests/models/decline-request.dto';
import { DiplomaStore as DiplomasStore } from './../+diplomas/diplomas.store';
import { UsersStore } from './../+users/users.store';
import { DiplomaInstructorThemeRequestDocument } from './../../documents/diploma-instructor-theme-request.document';
import { RequestStatus } from './../../enums/request-status.enum';
import { Step } from './../../enums/step.enum';
import { DiplomaInstructorThemeRequestEntity } from './diploma-instructor-theme-request.entity';
import { diplomaInstructorThemeRequestMapper } from './diploma-instructor-theme-request.mapper';
import { CreateDiplomaInstructorThemeRequestDTO } from './dtos/create-diploma-instructor-theme-request.dto';
import { PracticesStore } from '../+practices/practices.store';



@Injectable()
export class DiplomaInstructorThemeRequestsStore {
    constructor(
        @InjectModel('DiplomaInstructorThemeRequest') private _diplomaInstructorThemeRequestModel: Model<DiplomaInstructorThemeRequestDocument>,
        private readonly _diplomasStore: DiplomasStore,
        private readonly mailerService: MailerService,
        private readonly _usersStore: UsersStore,
        private readonly _practicesStore: PracticesStore,
    ) { }

    public async findAll(): Promise<DiplomaInstructorThemeRequestEntity[]> {
        const requests = await this._diplomaInstructorThemeRequestModel.find().populate('from').populate('to');
        
        return requests.map(s => diplomaInstructorThemeRequestMapper(s));
    }

    public async find(id: string | ObjectID): Promise<DiplomaInstructorThemeRequestEntity> {
        const request = await this._diplomaInstructorThemeRequestModel.findById(id).populate('from').populate('to');
        
        return diplomaInstructorThemeRequestMapper(request);
    }
    

    public async acceptByMethodologicalCommission(id: string, commisionMemberId: string): Promise<void> {
        const user = await this._usersStore.find(commisionMemberId);
        
        if (!user.roles.some(r => r === Role.MethodologicalCommitteeMember)) {
            throw new ForbiddenException();
        }

        const request: DiplomaInstructorThemeRequestEntity = await this.find(id);

        await this._diplomaInstructorThemeRequestModel.findByIdAndUpdate(id, {
            methodologicalCommissionApprove: true,
        });

        const diploma = (await this._diplomasStore.filter({
            studentId: request.fromId,
        }))[0];
        
        await this._diplomasStore.updateDiplomaStage(diploma.id, Step.PracticeDistribution);

        await this._practicesStore.create({
            studentId: diploma.studentId,
        });

        this.mailerService.sendMail({
            to: diploma.student.email, 
            from: process.env.EMAIL, 
            subject: 'Request was accepted!', 
            text: `You theme has been approved by the member of the methodological commission (${user.name}).`,
            html: `You theme has been approved by the member of the methodological commission (<strong>${user.name}</strong>).`,
          }).then();
    }
    
    public async declinedByMethodologicalCommission(dto: DeclineRequestDTO, commisionMemberId: string): Promise<void> {
        const user = await this._usersStore.find(commisionMemberId);
        
        if (!user.roles.some(r => r === Role.MethodologicalCommitteeMember)) {
            throw new ForbiddenException();
        }

        const request: DiplomaInstructorThemeRequestEntity = await this.find(dto.requestId);

        await this._diplomaInstructorThemeRequestModel.findByIdAndUpdate(dto.requestId, {
            methodologicalCommissionApprove: false,
        });

        const diploma = (await this._diplomasStore.filter({
            studentId: request.fromId,
        }))[0];

        await this._diplomasStore.updateDiplomaStage(diploma.id, Step.InstructorThemeChecking);

        this.mailerService.sendMail({
            to: diploma.student.email, 
            from: process.env.EMAIL, 
            subject: 'Request was declined!', 
            text: `You theme has been declined by the member of the methodological commission (${user.name}).`,
            html: `You theme has been declined by the member of the methodological commission (<strong>${user.name}</strong>).`,
          }).then();
    }

    public async acceptByProfessor(id: string, professorId: string): Promise<void> {
        const request: DiplomaInstructorThemeRequestEntity = await this._getRequestForChange(id, professorId);

        await this._diplomaInstructorThemeRequestModel.findByIdAndUpdate(id, {
            status: RequestStatus.Accepted
        });

        const diploma = (await this._diplomasStore.filter({
            studentId: request.fromId,
        }))[0];

        await this._diplomasStore.updateDiplomaStage(diploma.id, Step.MethodologicalMemberThemeChecking);

        this.mailerService.sendMail({
            to: diploma.student.email, 
            from: process.env.EMAIL, 
            subject: 'Request was accepted!', 
            text: `Request for approve atestion work theme was accepeted by ${request.to.name}.`,
            html: `Request for approve atestion work theme was accepeted by <strong>${request.to.name}</strong>.`,
          }).then();
    }

    public async declineByProfessor(dto: DeclineRequestDTO, professorId: string): Promise<void> {
        const request: DiplomaInstructorThemeRequestEntity = await this._getRequestForChange(dto.requestId, professorId);

        await this._diplomaInstructorThemeRequestModel.findByIdAndUpdate(dto.requestId, {
            status: RequestStatus.Closed,
            declinedComment: dto.comment
        });

        const diploma = (await this._diplomasStore.filter({
            studentId: request.fromId,
        }))[0];

        await this._diplomasStore.updateById(diploma.id, diploma);

        this.mailerService.sendMail({
            to: diploma.student.email, 
            from: process.env.EMAIL, 
            subject: 'Request was declined!', 
            text: `Request for approve atestion work theme was declined by ${request.to.name}.`,
            html: `Request for approve atestion work theme was declined by <strong>${request.to.name}</strong>.`,
          }).then();
    }

    public async create(dto: CreateDiplomaInstructorThemeRequestDTO): Promise<DiplomaInstructorThemeRequestEntity> {
        const req = (await this._diplomasStore.filter({
            studentId: dto.fromId,
        }))[0];

        if (!req) {
            throw new BadRequestException();
        }
        
        const request = await this._diplomaInstructorThemeRequestModel.create({
            ...dto,
            from: dto.fromId,
            to: req.instructorId,
        });
        
        const res = await this.find(request.id);

        this.mailerService.sendMail({
            to: res.to.email, 
            from: process.env.EMAIL, 
            subject: 'New Request!', 
            text: `Request to approve atestion work theme. You have new request from ${res.from.name}. `,
            html: `Request to approve atestion work theme. You have new request from <strong>${res.from.name}</strong> `,
          }).then();

        return res;
    }

    public async filter(query: SearchRequestsQuery): Promise<DiplomaInstructorThemeRequestEntity[]> {
        let req = this._diplomaInstructorThemeRequestModel.find();

        if (!isNil(query.toId)) {
            req = req.find({ to: query.toId });
        }

        if (!isNil(query.fromId)) {
            req = req.find({ from: query.fromId });
        }

        if (!isNil(query.statuses)) {
            req = req.find({ status: { "$in" : query.statuses} });
        }

        const requests = await req.populate('from').populate('to').sort([['_id', -1]]);
        
        return requests.map(s => diplomaInstructorThemeRequestMapper(s));

    }

    private async _getRequestForChange(id: string, professorId: string): Promise<DiplomaInstructorThemeRequestEntity> {
        const request: DiplomaInstructorThemeRequestEntity = await this.find(id);

        const instructorId = request.toId;

        if (instructorId !== professorId) {
            throw new ForbiddenException();
        } 

        return request;
    }
}
