import { DiplomasModule } from './../+diplomas/diplomas.module';
import { ProfessorsStore } from './professors.store';
import { ProfessorSchema } from './../../schemas/professor.schema';
import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserSchema } from './../../schemas/user.schema';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { UsersModule } from '../+users/users.module';
import { DepartmentsModule } from '../+departments/department.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema }, 
        ]),
        UsersModule, 
        DepartmentsModule,
        DiplomasModule,
    ],
    controllers: [ProfessorsController],
    providers: [
        ProfessorsStore,
        {
            provide: getModelToken('Professor'),
            useFactory: (userModel) => 
                userModel.discriminator('Professor', ProfessorSchema),
            inject: [getModelToken('User')]
        },
        ProfessorsService
    ],
    exports: [],
})
export class ProfessorsModule { }
