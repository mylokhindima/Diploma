import { DepartmentDocument } from './../../documents/department.document';
import { DepartmentEntity } from './department.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDepartmentDTO } from './dtos/create-department.dto';
import { departmentMapper } from './department.mapper';

interface EducationalProgramQuery {
    name: string;
}

@Injectable()
export class DepartmentsStore {
    constructor(
        @InjectModel('Department') private _departmentModel: Model<DepartmentDocument>,
    ) { }

    public async findAll(): Promise<DepartmentEntity[]> {
        const departments = await this._departmentModel.find().populate('specialties');
        
        return departments.map(d => departmentMapper(d));
    }

    public async find(id: string): Promise<DepartmentEntity> {
        const department = await this._departmentModel.findById(id).populate('specialties');

        return department ? departmentMapper(department) : null;
    }

    public async findFirstByQuery(query: EducationalProgramQuery): Promise<DepartmentEntity> {
        const department = await this._departmentModel.findOne(query as any).populate('specialties');

        return department ? departmentMapper(department) : null;
    }

    public async create(departmentDTO: CreateDepartmentDTO): Promise<DepartmentEntity> {
        const createdDepartment = (await this._departmentModel.create(departmentDTO)).populate('specialties');

        return departmentMapper(createdDepartment);
    }
}
