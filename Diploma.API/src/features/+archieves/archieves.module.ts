import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchiveSchema } from './../../schemas/archive.schema';
import { ArchievesStore } from './archieves.store';
import { ArchivesController } from './archives.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Archieve',
                schema: ArchiveSchema,
            },
        ]),
    ],
    controllers: [ArchivesController],
    providers: [
        ArchievesStore,
    ],
    exports: [ArchievesStore],
})
export class ArchievesModule { }
