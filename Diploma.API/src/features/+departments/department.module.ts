import { ProfessorsModule } from './../+professors/professors.module';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from './../../schemas/department.schema';
import { DepartmentsController } from './departments.controller';
import { DepartmentsStore } from './departments.store';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Department',
                schema: DepartmentSchema,
            },
        ]),
        forwardRef(() => ProfessorsModule),
    ],
    controllers: [DepartmentsController],
    providers: [DepartmentsStore],
    exports: [DepartmentsStore],
})
export class DepartmentsModule { }
