import { ProfessorsStore } from './../+professors/professors.store';
import { Role } from './../../enums/role.enum';
import { ProfessorDocument } from './../../documents/professor.document';
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
       private _professorsStore: ProfessorsStore,
    ) { }

    public async findAll(): Promise<DepartmentEntity[]> {
        const departments = await this._departmentModel.find().populate({
            path: 'specialties', 
            populate: {
                path: 'educationalPrograms',
            }
        });

        const data = departments.map(d => departmentMapper(d));

        const professors = await this._professorsStore.findByQuery({
            role: Role.HeadOfDepartment,
            isActive: true,
        });

        professors.forEach(p => {
            const department = data.find(d => d.id === p.departmentId);

            if (department) {
                department.responsible = p;
                department.responsibleId = p.id;
            }
        })
        
        return data;
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
