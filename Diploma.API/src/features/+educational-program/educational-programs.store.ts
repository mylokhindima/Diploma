import { SpecialtyDocument } from './../../documents/specialty.document';
import { EducationalForm } from './../../enums/educational-form.enum';
import { StudentDegree } from './../../enums/student-degree.enum';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalProgramDocument } from '../../documents/educational-program.document';
import { EducationalProgramEntity } from './educational-program.entity';
import { educationalProgramMapper } from './educational-program.mapper';
import { CreateEducationalProgramDTO } from './models/create-educational-program';

interface EducationalProgramQuery {
    duration?: number;
    form?: EducationalForm;
    degree?: StudentDegree,
    specialty?: string, 
}

@Injectable()
export class EducationalProgramsStore {
    constructor(
        @InjectModel('EducationalProgram') private _educationalProgramModel: Model<EducationalProgramDocument>,
        @InjectModel('Specialty') private _specialtyModel: Model<SpecialtyDocument>,
    ) { }

    public async findAll(): Promise<EducationalProgramEntity[]> {
        const programs = await this._educationalProgramModel.find().populate('specialty');
        
        return programs.map(s => educationalProgramMapper(s));
    }

    public async find(id: string): Promise<EducationalProgramEntity> {
        const program = await this._educationalProgramModel.findById(id).populate('specialty');

        return program ? educationalProgramMapper(program) : null;
    }

    public async findByDepartmentId(id: string): Promise<EducationalProgramEntity[]> {
        let programs = await this.findAll();

        return programs.filter(p => p.specialty.departmentId === id);
    }

    public async create(dto: CreateEducationalProgramDTO): Promise<EducationalProgramEntity> {
        const specialty = await this._specialtyModel.findById(dto.specialtyId);

        if (!specialty) {
            throw new BadRequestException();
        }
        
        const createdProgram = (await this._educationalProgramModel.create({  
            specialty: dto.specialtyId,
            degree: dto.degree,
            form: dto.form,
            duration: dto.duration,
            name: dto.name,
        })).populate('specialties');

        specialty.get('educationalPrograms').push(createdProgram);

        specialty.save();

        return educationalProgramMapper(createdProgram);
    }

    public async findFirstByQuery(query: EducationalProgramQuery): Promise<EducationalProgramEntity> {
        const program = await this._educationalProgramModel.findOne(query as any).populate('specialty');

        return program ? educationalProgramMapper(program) : null;
    }
}
