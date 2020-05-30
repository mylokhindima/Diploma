import { StageSchema } from './../../schemas/stage.schema';
import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../+users/users.module';
import { DiplomasModule } from './../+diplomas/diplomas.module';
import { EducationalProgramsModule } from './../+educational-program/educational-programs.module';
import { SpecialtiesModule } from './../+specialties/specialty.module';
import { DepartmentSchema } from './../../schemas/department.schema';
import { EducationalProgramSchema } from './../../schemas/educational-program.schema';
import { SpecialtySchema } from './../../schemas/specialty.schema';
import { StudentSchema } from './../../schemas/student.schema';
import { UserSchema } from './../../schemas/user.schema';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsStore } from './students.store';

@Module({
    imports: [
        UsersModule,
        SpecialtiesModule,
        EducationalProgramsModule,
        DiplomasModule,
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'EducationalProgram', schema: EducationalProgramSchema },
            { name: 'Specialty', schema: SpecialtySchema },
            { name: 'Department', schema: DepartmentSchema }, 
            { name: 'Stage', schema: StageSchema }, 
        ])
    ],
    controllers: [StudentsController],
    providers: [
        StudentsStore,
        {
            provide: getModelToken('Student'),
            useFactory: (userModel) => userModel.discriminator('Student', StudentSchema),
            inject: [getModelToken('User')]
        }, 
        StudentsService,
    ],
    exports: [StudentsStore],
})
export class StudentsModule { }
