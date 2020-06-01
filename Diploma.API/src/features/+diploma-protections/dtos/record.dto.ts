import { ApiProperty } from "@nestjs/swagger";

export class RecordDTO {
    @ApiProperty()
    studentId: string;
    @ApiProperty()
    sectionId: string;
}