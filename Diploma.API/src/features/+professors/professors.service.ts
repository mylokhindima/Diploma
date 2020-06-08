import { ProfessorsStore } from './professors.store';
import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import readXlsxFile from 'read-excel-file';
import { DepartmentsStore } from './../+departments/departments.store';
import { UsersStore } from './../+users/users.store';
import { ProfessorDegree } from './../../enums/proffesor-degree.enum';
import { ProfessorEntity } from './professor.entity';

@Injectable()
export class ProfessorsService {
    constructor(
        private _usersStore: UsersStore,
        private _professorsStore: ProfessorsStore,
        private _departmentsStore: DepartmentsStore,
    ) { }

    public async upload(file: any): Promise<ProfessorEntity[]> {
        const data: any[] = await readXlsxFile(file.buffer);

        data.shift();

        const createRequests: Promise<ProfessorEntity>[] = data.map(this._createProfessor.bind(this));

        const professors = (await Promise.all(createRequests)).filter(Boolean);
        
        return professors;
    }

    private async _createProfessor([name, email, degreeKey, departmentKey]): Promise<ProfessorEntity> {
        const emailSchema = Joi.string().required().email();

        const res = emailSchema.validate(email);

        if (res.error) {
            return;
        }

        let degree: ProfessorDegree;

        switch((degreeKey as string).toLowerCase()) {
            case 'асистент': 
                degree = ProfessorDegree.Assistant;
                break;
            case 'старший викладач':
                degree = ProfessorDegree.SeniorLecturer;
                break;
            case 'доцент': 
                degree = ProfessorDegree.Docent;
            case 'професор':
                degree = ProfessorDegree.Professor;
        }

        if (isNil(degree)) {
            return;
        }

        const user = await this._usersStore.findByEmail(email);

        if (user) {
            return;
        }

        const department = await this._departmentsStore.findFirstByQuery({
            name: departmentKey,
        });

        if (!department) {
            return;
        }

        const professor = await this._professorsStore.create({
            name,
            email,
            degree,
            departmentId: department.id,
        });

        return professor;
    }
}
