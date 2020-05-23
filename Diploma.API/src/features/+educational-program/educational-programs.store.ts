import { EducationalForm } from './../../enums/educational-form.enum';
import { StudentDegree } from './../../enums/student-degree.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalProgramDocument } from '../../documents/educational-program.document';
import { EducationalProgramEntity } from './educational-program.entity';
import { educationalProgramMapper } from './educational-program.mapper';

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
    ) { }

    public async findAll(): Promise<EducationalProgramEntity[]> {
        const programs = await this._educationalProgramModel.find().populate('specialty');
        
        return programs.map(s => educationalProgramMapper(s));
    }

    public async find(id: string): Promise<EducationalProgramEntity> {
        const program = await this._educationalProgramModel.findById(id).populate('specialty');

        return program ? educationalProgramMapper(program) : null;
    }

    public async findFirstByQuery(query: EducationalProgramQuery): Promise<EducationalProgramEntity> {
        const program = await this._educationalProgramModel.findOne(query as any).populate('specialty');

        return program ? educationalProgramMapper(program) : null;
    }
}
