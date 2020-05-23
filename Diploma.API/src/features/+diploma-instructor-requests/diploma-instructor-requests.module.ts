import { UsersModule } from './../+users/users.module';
import { DiplomasModule } from './../+diplomas/diplomas.module';
import { StagesModule } from './../+stages/stages.module';
import { UserSchema } from './../../schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { DiplomaInstructorRequestSchema } from './../../schemas/diploma-instructor-request.schema';
import { DiplomaInstructorRequestsController } from './diploma-instructor-request.controller';
import { DiplomaInstructorRequestsStore } from './diploma-instructor-requests.store';
import { StudentsModule } from '../+students/students.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'DiplomaInstructorRequest',
                schema: DiplomaInstructorRequestSchema,
            },
        ]),
        StudentsModule,
        DiplomasModule,
        StagesModule,
        UsersModule,
    ],
    controllers: [DiplomaInstructorRequestsController],
    providers: [
        DiplomaInstructorRequestsStore,
    ],
    exports: [DiplomaInstructorRequestsStore],
})
export class DiplomaInstructorRequestsModule { }
