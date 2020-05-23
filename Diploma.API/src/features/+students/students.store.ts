import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { EducationalProgramDocument } from '../../documents/educational-program.document';
import { StudentDocument } from '../../documents/student.document';
import { DiplomaStore } from './../+diplomas/diplomas.store';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { StudentEntity } from './student.entity';
import { studentMapper } from './student.mapper';

var generator = require('generate-password');

@Injectable()
export class StudentsStore {
    constructor(
        @InjectModel('Student') private _studentModel: Model<StudentDocument>,
        @InjectModel('EducationalProgram') private _educationalProgramModel: Model<EducationalProgramDocument>,
        private readonly mailerService: MailerService,
        private readonly diplomaStore: DiplomaStore,
    ) { }

    public async findAll(): Promise<StudentEntity[]> {
        const students = await this._studentModel.find({
            isActive: true,
        }).populate({
           path: 'educationalProgram', 
           populate: {
                path: 'specialty',
           }
        }).sort([['_id', -1]]);
        
        return students.map(s => studentMapper(s));
    }

    public async find(id: string): Promise<StudentEntity> {
        const student = await this._studentModel.findById(id).populate({
            path: 'educationalProgram', 
            populate: {
                 path: 'specialty',
            }
        });

        return student ? studentMapper(student) : null;
    }

    public async findByEducationalProgramId(id: string): Promise<StudentEntity[]> {
        const students = await this._studentModel.find({
            educationalProgram: id,
        }).populate({
            path: 'educationalProgram', 
            populate: {
                 path: 'specialty',
            }
        });

        return students.map(s => studentMapper(s));
    }

    public async update(id: string | ObjectID, studentUpdate: Partial<StudentEntity>): Promise<StudentEntity> {
        const student = await this._studentModel.findByIdAndUpdate(id, studentUpdate).populate({
            path: 'educationalProgram', 
            populate: {
                 path: 'specialty',
            }
        });

        return student ? studentMapper(student) : null;
    }

    public async create(createStudent: CreateStudentDTO): Promise<StudentEntity> {
        const educationalProgram = await this._educationalProgramModel.findById(createStudent.educationalProgramId).populate('specialty');

        if (!educationalProgram) {
            throw new BadRequestException();
        }

        const password = generator.generate({
            length: 10,
            numbers: true
        });

        const department = educationalProgram.get('specialty.department');
        
        const student = { ...createStudent, password, department, educationalProgram: createStudent.educationalProgramId  };

        const createdStudent = (await this._studentModel.create(student));

        this.diplomaStore.create({
            studentId: createdStudent.id,
        });

        this.mailerService.sendMail({
            to: student.email, // list of receivers
            from: process.env.EMAIL, // sender address
            subject: 'Now your are in diploma system!', // Subject line
            text: `Nure welcomes you!\nYour password: ${password}`, // plaintext body
            html: `<p>Nure welcomes you!</p>
                  <p>Your password: <strong>${password}</strong></p>`, // HTML body content
          }).then();

        return await this.find(createdStudent.id);
    }
}
