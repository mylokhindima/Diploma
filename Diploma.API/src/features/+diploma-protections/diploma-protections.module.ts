import { TimeSectionSchema } from './../../schemas/time-section.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiplomaProtectionSchema } from '../../schemas/diploma-protection.schema';
import { DiplomaProtectionsController } from './diploma-protections.controller';
import { DiplomaProtectionsStore } from './diploma-protections.store';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'DiplomaProtection',
                schema: DiplomaProtectionSchema,
            },
            {
                name: 'TimeSection',
                schema: TimeSectionSchema,
            },
        ]),
    ],
    controllers: [DiplomaProtectionsController],
    providers: [
        DiplomaProtectionsStore,
    ],
    exports: [DiplomaProtectionsStore],
})
export class DiplomaProtectionsModule { }
