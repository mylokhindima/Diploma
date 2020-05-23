import { FilesModule } from './../+files/files.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiplomaSchema } from '../../schemas/diploma.schema';
import { StagesModule } from './../+stages/stages.module';
import { ReportSchema } from './../../schemas/report.schema';
import { DiplomasController } from './diplomas.controller';
import { DiplomaStore } from './diplomas.store';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Diploma',
                schema: DiplomaSchema,
            },
            {
                name: 'Report',
                schema: ReportSchema,
            },
        ]),
        StagesModule,
        FilesModule,
    ],
    controllers: [DiplomasController],
    providers: [
        DiplomaStore,
    ],
    exports: [DiplomaStore],
})
export class DiplomasModule { }
