import { FilesModule } from './../+files/files.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticeSchema } from './../../schemas/practice.schema';
import { PracticesController } from './practices.controller';
import { PracticesStore } from './practices.store';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Practice',
                schema: PracticeSchema,
            },
        ]),
        FilesModule,
    ],
    controllers: [PracticesController],
    providers: [
        PracticesStore,
    ],
    exports: [PracticesStore],
})
export class PracticesModule { }
