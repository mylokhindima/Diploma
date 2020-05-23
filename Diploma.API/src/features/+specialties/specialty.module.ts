import { SpecialtiesStore } from './specialties.store';
import { DepartmentSchema } from './../../schemas/department.schema';
import { SpecialtySchema } from './../../schemas/specialty.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpecialtiesController } from './sepcialties.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Specialty', schema: SpecialtySchema }, 
            { name: 'Department', schema: DepartmentSchema }
        ])
    ],
    controllers: [SpecialtiesController],
    providers: [
        SpecialtiesStore,
    ],
    exports: [SpecialtiesStore],
})
export class SpecialtiesModule { }
