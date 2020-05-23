import { DepartmentSchema } from './../../schemas/department.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsStore } from './departments.store';
import { DepartmentsController } from './departments.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Department',
                schema: DepartmentSchema,
            },
        ]),
    ],
    controllers: [DepartmentsController],
    providers: [DepartmentsStore],
    exports: [DepartmentsStore],
})
export class DepartmentsModule { }
