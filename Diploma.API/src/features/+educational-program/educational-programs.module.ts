import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationalProgramSchema } from '../../schemas/educational-program.schema';
import { EducationalProgramsController } from './educational-programs.controller';
import { EducationalProgramsStore } from './educational-programs.store';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'EducationalProgram',
                schema: EducationalProgramSchema,
            },
        ]),
    ],
    controllers: [EducationalProgramsController],
    providers: [EducationalProgramsStore],
    exports: [EducationalProgramsStore],
})
export class EducationalProgramsModule { }
