import { ApiProperty } from "@nestjs/swagger";

export class CreateTimeSectionDTO {
    @ApiProperty()
    diplomaProtectionId: string;
    @ApiProperty()
    startTime: string;
    @ApiProperty()
    studentId: string;
}