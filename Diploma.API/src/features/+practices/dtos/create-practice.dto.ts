import { ApiProperty } from "@nestjs/swagger"

export class CreatePracticeDTO {
    @ApiProperty()
    instructorId: string;
    @ApiProperty()
    location: string;
    @ApiProperty()
    studentId: string;
}