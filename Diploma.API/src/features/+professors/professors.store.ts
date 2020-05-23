import { SearchProfessorsQueryBuilder } from './search-professors-query.builder';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDocument } from '../../documents/student.document';
import { CreateProfessorDTO } from './dtos/create-professor.dto';
import { ProfessorEntity } from './professor.entity';
import { professorMapper } from './professor.mapper';
import { ProfessorQuery } from './dtos/professor.query';

var generator = require('generate-password');

@Injectable()
export class ProfessorsStore {
    constructor(
        @InjectModel('Professor') private _professorModel: Model<StudentDocument>,
        private readonly mailerService: MailerService,
    ) { }

    public async findAll(): Promise<ProfessorEntity[]> {
        const professors = await this._professorModel.find({
            isActive: true,
        }).populate('department').sort([['_id', -1]]);
        
        return professors.map(p => professorMapper(p));
    }

    public async find(id: string): Promise<ProfessorEntity> {
        const professor = await this._professorModel.findById(id).populate('department');

        return professor ? professorMapper(professor) : null;
    }

    public async findByQuery(query: ProfessorQuery): Promise<ProfessorEntity[]> {
        const professors = await new SearchProfessorsQueryBuilder(this._professorModel)
            .setIsActive(query.isActive)
            .setDepartmentId(query.departmentId)
            .sortAsc()
            .build();
        
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
