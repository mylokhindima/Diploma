import { ApiProperty } from "@nestjs/swagger"

export class SearchPracticesDTO {
    @ApiProperty()
    instructorId?: string;
}