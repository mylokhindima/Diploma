import { ApiProperty } from '@nestjs/swagger';

export class CreateArchieveDTO {
    @ApiProperty()
    diplomaReportId: string;
}