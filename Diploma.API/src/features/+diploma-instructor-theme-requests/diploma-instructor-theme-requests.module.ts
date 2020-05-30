import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../+users/users.module';
import { DiplomaInstructorRequestSchema } from '../../schemas/diploma-instructor-request.schema';
import { DiplomaInstructorThemeRequestSchema } from '../../schemas/diploma-instructor-theme-request.schema';
import { DiplomasModule } from './../+diplomas/diplomas.module';
import { DiplomaInstructorThemeRequestsController } from './diploma-instructor-theme-requests.controller';
import { DiplomaInstructorThemeRequestsStore } from './diploma-instructor-theme-requests.store';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'DiplomaInstructorRequest',
                schema: DiplomaInstructorRequestSchema,
            },
        ]),
        DiplomasModule,
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
