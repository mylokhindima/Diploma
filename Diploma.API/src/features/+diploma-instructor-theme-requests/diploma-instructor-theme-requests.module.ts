import { StagesModule } from './../+stages/stages.module';
import { DiplomasModule } from './../+diplomas/diplomas.module';
import { DiplomaInstructorThemeRequestsStore } from './diploma-instructor-theme-requests.store';
import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { DiplomaInstructorRequestSchema } from '../../schemas/diploma-instructor-request.schema';
import { DiplomaInstructorThemeRequestSchema } from '../../schemas/diploma-instructor-theme-request.schema';
import { DiplomaInstructorThemeRequestsController } from './diploma-instructor-theme-requests.controller';
import { UsersModule } from '../+users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'DiplomaInstructorRequest',
                schema: DiplomaInstructorRequestSchema,
            },
        ]),
        DiplomasModule,
        StagesModule,
        UsersModule,
    ],
    controllers: [DiplomaInstructorThemeRequestsController],
    providers: [
        {
            provide: getModelToken('DiplomaInstructorThemeRequest'),
            useFactory: (userModel) => userModel.discriminator('DiplomaInstructorThemeRequest', DiplomaInstructorThemeRequestSchema),
            inject: [getModelToken('DiplomaInstructorRequest')]
        },
        DiplomaInstructorThemeRequestsStore,
    ],
    exports: [],
})
export class DiplomaInstructorThemeRequestsModule { }
