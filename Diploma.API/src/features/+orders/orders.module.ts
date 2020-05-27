import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiplomasModule } from './../+diplomas/diplomas.module';
import { FilesModule } from './../+files/files.module';
import { PracticesModule } from './../+practices/practices.module';
import { StudentsModule } from './../+students/students.module';
import { EducationalProgramSchema } from './../../schemas/educational-program.schema';
import { OrderSchema } from './../../schemas/order.schema';
import { OrdersController } from './orders.controller';
import { OrdersStore } from './orders.store';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Order',
                schema: OrderSchema,
            },
            {
                name: 'EducationalProgram',
                schema: EducationalProgramSchema,
            },
        ]),
        StudentsModule,
        DiplomasModule,
        FilesModule,
        PracticesModule,
    ],
    controllers: [OrdersController],
    providers: [
        OrdersStore,
    ],
    exports: [OrdersStore],
})
export class OrdersModule { }
