import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from '../+students/students.module';
import { DiplomasModule } from './../+diplomas/diplomas.module';
import { UsersModule } from './../+users/users.module';
import { DiplomaInstructorRequestSchema } from './../../schemas/diploma-instructor-request.schema';
import { DiplomaInstructorRequestsController } from './diploma-instructor-request.controller';
import { DiplomaInstructorRequestsStore } from './diploma-instructor-requests.store';

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
        UsersModule,
    ],
    controllers: [DiplomaInstructorRequestsController],
    providers: [
        DiplomaInstructorRequestsStore,
    ],
    exports: [DiplomaInstructorRequestsStore],
})
export class DiplomaInstructorRequestsModule { }
