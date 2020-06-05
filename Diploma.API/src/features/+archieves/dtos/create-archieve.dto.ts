import { ApiProperty } from '@nestjs/swagger';

export class CreateArchieveDTO {
    @ApiProperty()
    diplomaId: string;
    @ApiProperty()
    diplomaReportId: string;
}