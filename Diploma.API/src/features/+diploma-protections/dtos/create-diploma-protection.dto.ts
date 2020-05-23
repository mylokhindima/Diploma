import { ApiProperty } from "@nestjs/swagger";

export class CreateDiplomaProtectionDTO {
    @ApiProperty()
    educationalProgramId: string;
    @ApiProperty()
    timeStart: string;
    @ApiProperty()
    timeEnd: string;
}