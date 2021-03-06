import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './../../schemas/file.schema';
import { FilesStore } from './files.store';
import { FilesController } from './files.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'File',
                schema: FileSchema,
            },
        ]),
    ],
    controllers: [FilesController],
    providers: [
        FilesStore,
    ],
    exports: [FilesStore],
})
export class FilesModule { }
