import { ApiProperty } from "@nestjs/swagger"

export class ExamineDTO {
    @ApiProperty()
    score: number;
}