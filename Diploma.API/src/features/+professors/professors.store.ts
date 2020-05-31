import { SetRolesDTO } from './dtos/set-roles.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDocument } from '../../documents/student.document';
import { DiplomaStore } from './../+diplomas/diplomas.store';
import { CreateProfessorDTO } from './dtos/create-professor.dto';
import { ProfessorQuery } from './dtos/professor.query';
import { ProfessorEntity } from './professor.entity';
import { professorMapper } from './professor.mapper';
import { SearchProfessorsQueryBuilder } from './search-professors-query.builder';
import { request } from 'express';
import { UpdateCapacityDTO } from './dtos/update-capacities.dto';

var generator = require('generate-password');

@Injectable()
export class ProfessorsStore {
    constructor(
        @InjectModel('Professor') private _professorModel: Model<StudentDocument>,
        private readonly mailerService: MailerService,
        private readonly diplomasStore: DiplomaStore,
    ) { }

    public async findAll(): Promise<ProfessorEntity[]> {
        const professors = await this._professorModel.find({
            isActive: true,
        }).populate('department').sort([['_id', -1]]);
        
        return professors.map(p => professorMapper(p));
    }

    public async updateCapacities(dtos: UpdateCapacityDTO[]): Promise<void> {
        const requests = dtos.map(dto => this._professorModel.findByIdAndUpdate(dto.professorId, {
            capacity: dto.capacity
        }));

        await Promise.all(requests);
    }

    public async setRoles(dtos: SetRolesDTO[]): Promise<void> {
        const requests = dtos.map(dto => this._professorModel.findByIdAndUpdate(dto.professorId, {
            roles: dto.roles,
        }));

        await Promise.all(requests);
    }

    public async find(id: string): Promise<ProfessorEntity> {
        const professor = await this._professorModel.findById(id).populate('department');

        return professor ? professorMapper(professor) : null;
    }

    public async findByQuery(query: ProfessorQuery): Promise<ProfessorEntity[]> {
        let professors = await new SearchProfessorsQueryBuilder(this._professorModel)
            .setIsActive(query.isActive)
            .setDepartmentId(query.departmentId)
            .setRole(query.role)
            .sortAsc()
            .build();

        if (query.available) {
            const requests = professors.map(p => {
                return this.diplomasStore.filter({
                    instructorId: p.id 
                });    
            })

            const results = await Promise.all(requests);

            professors = professors.filter((p, i) => p.capacity && p.capacity > results[i].length);
        }
        
        return professors.map(p => professorMapper(p));
    }

    public async create(professorDTO: CreateProfessorDTO): Promise<ProfessorEntity> {
        const password = generator.generate({
            length: 10,
            numbers: true
        });

        const createdProfessor = await this._professorModel.create({
            ...professorDTO,
            department: professorDTO.departmentId,
            password,
        });

        this.mailerService.sendMail({
            to: professorDTO.email, // list of receivers
            from: process.env.EMAIL, // sender address
            subject: 'Now your are in diploma system!', // Subject line
            text: `Nure welcomes you!\nYour password: ${password}`, // plaintext body
            html: `<p>Nure welcomes you!</p>
                  <p>Your password: <strong>${password}</strong></p>`, // HTML body content
          }).then();

        return await this.find(createdProfessor.id);
    }
}
