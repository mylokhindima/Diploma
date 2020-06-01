import { pick } from 'lodash';
import { educationalProgramMapper } from '../+educational-program/educational-program.mapper';
import { fileMapper } from '../+files/file.mapper';
import { baseMapper } from '../../base/base.mapper';
import { EducationalProgramDocument } from './../../documents/educational-program.document';
import { FileDocument } from './../../documents/file.document';
import { OrderDocument } from './../../documents/order.document';
import { OrderEntity } from './order.entity';

export function orderMapper(order: OrderDocument): OrderEntity {
    const partial = {
        ...baseMapper(order),
        ...pick(order, ['approved', 'startDate', 'endDate'])
    } as any as Partial<OrderEntity>;

    if (order.populated('educationalProgram')) {
        const educationalProgram = (order.educationalProgram as EducationalProgramDocument);

        partial.educationalProgramId = educationalProgram.id;
        partial.educationalProgram = educationalProgramMapper(educationalProgram);
    } else {    
        partial.educationalProgramId = order.educationalProgram.toString();
        partial.educationalProgram = null;
    }

    if (order.populated('file')) {
        const file = (order.file as FileDocument);

        partial.fileId = file.id;
        partial.file = fileMapper(file);
    } else if (order.file) {    
        partial.fileId = order.file.toString();
        partial.file = null;
    }

    return new OrderEntity(partial);
}