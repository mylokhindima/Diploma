import { OrderType } from './order-type.enum';


export interface CreateOrderDTO {
    educationalProgramId: string;
    startDate: string;
    endDate: string;
    type: OrderType;
}
