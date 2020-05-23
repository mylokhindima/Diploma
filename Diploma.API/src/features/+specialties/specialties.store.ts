import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepartmentDocument } from './../../documents/department.document';
import { SpecialtyDocument } from './../../documents/specialty.document';
import { CreateSpecialtyDTO } from './dtos/create-specialty.dto';
import { SpecialtyEntity } from './specialty.entity';
import { specialtyMapper } from './specialty.mapper';

interface SearchSpecialtyQuery {
    name?: string;
}

@Injectable()
export class SpecialtiesStore {
    constructor(
        @InjectModel('Specialty') private _specialtyModel: Model<SpecialtyDocument>,
        @InjectModel('Department') private _departmentModel: Model<DepartmentDocument>,
    ) { }

    public async findAll(): Promise<SpecialtyEntity[]> {
        const specialties = await this._specialtyModel.find();
        
        return specialties.map(s => specialtyMapper(s));
    }

    public async find(id: string): Promise<SpecialtyEntity> {
        const specialty = await this._specialtyModel.findById(id);

        return specialty ? specialtyMapper(specialty) : null;
    }

    public async findFirstByQuery(query: SearchSpecialtyQuery): Promise<SpecialtyEntity> {
        const specialty = await this._specialtyModel.findOne(query);

        return specialty ? specialtyMapper(specialty) : null;
    }

    public async create(specialtyDTO: CreateSpecialtyDTO): Promise<SpecialtyEntity> {
        const department = await this._departmentModel.findById(specialtyDTO.departmentId);

        if (!department) {
            throw new BadRequestException();
        }

        const createdSpecialty = (await this._specialtyModel.create({
            ...specialtyDTO,
            department: specialtyDTO.departmentId,
        }));
        
        department.get('specialties').push(createdSpecialty);

        department.save();

        return specialtyMapper(createdSpecialty);
    }
}
