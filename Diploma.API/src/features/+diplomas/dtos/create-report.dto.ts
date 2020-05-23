import { ApiProperty } from "@nestjs/swagger";

export class CreateReportDTO {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
    @ApiProperty()
    id: string;
}
