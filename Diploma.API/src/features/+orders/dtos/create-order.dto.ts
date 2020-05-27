import { ApiProperty } from "@nestjs/swagger";
import { OrderType } from './../../../enums/order-type.enum';

export class CreateOrderDTO {
    @ApiProperty()
    educationalProgramId: string;
    @ApiProperty({
        type: String,
        format: 'date-time',
    })
    startDate: string;
    @ApiProperty({
        type: String,
        format: 'date-time',
    })
    endDate: string;
    @ApiProperty()
    type: OrderType;
}