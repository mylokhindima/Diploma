import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import readXlsxFile from 'read-excel-file';
import { EducationalProgramEntity } from '../+educational-program/educational-program.entity';
import { SpecialtiesStore } from '../+specialties/specialties.store';
import { EducationalProgramsStore } from './../+educational-program/educational-programs.store';
import { UsersStore } from './../+users/users.store';
import { EducationalForm } from './../../enums/educational-form.enum';
import { StudentDegree } from './../../enums/student-degree.enum';
import { StudentEntity } from './student.entity';
import { StudentsStore } from './students.store';

@Injectable()
export class StudentsService {
    constructor(
        private _usersStore: UsersStore,
        private _studentsStore: StudentsStore,
        private _specialtiesStore: SpecialtiesStore,
        private _educationalProgramsStore: EducationalProgramsStore,
    ) { }

    public async upload(file: any): Promise<StudentEntity[]> {
        const data: any[] = await readXlsxFile(file.buffer);

        data.shift();

        const createRequests: Promise<StudentEntity>[] = data.map(this._createStudent.bind(this));

        const students = (await Promise.all(createRequests)).filter(Boolean);
        
        return students;
    }

    private async _createStudent([name, email, degreeName, group, educationalProgramKey]): Promise<StudentEntity> {
        const emailSchema = Joi.string().required().email();

        const res = emailSchema.validate(email);

        if (res.error) {
            return;
        }

        let degree: StudentDegree;

        switch((degreeName as string).toLowerCase()) {
            case 'бакалавр': 
                degree = StudentDegree.Bachelor;
                break;
            case 'магістр':
                degree = StudentDegree.Master;
                break;
        }

        if (isNil(degree)) {
            return;
        }

        const user = await this._usersStore.findByEmail(email);

        if (user) {
            return;
        }

        const educationalProgram = await this._educationalProgramsStore.findFirstByQuery({
            name: educationalProgramKey,
        })

        if (!educationalProgram) {
            return;
        }

        const student = await this._studentsStore.create({
            degree,
            educationalProgramId: educationalProgram.id,
            email,
            group,
            name,
        });

        return student;
    }
}
