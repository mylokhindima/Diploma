import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StageSchema } from './../../schemas/stage.schema';
import { StagesStore } from './stages.store';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Stage',
                schema: StageSchema,
            },
        ]),
    ],
    controllers: [],
    providers: [
        StagesStore,
    ],
    exports: [StagesStore],
})
export class StagesModule { }
