import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StageSchema } from './../../schemas/stage.schema';
import { StagesStore } from './stages.store';
import { StagesController } from './stages.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Stage',
                schema: StageSchema,
            },
        ]),
    ],
    controllers: [StagesController],
    providers: [
        StagesStore,
    ],
    exports: [StagesStore],
})
export class StagesModule { }
