import { ApiProperty } from "@nestjs/swagger";

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
}