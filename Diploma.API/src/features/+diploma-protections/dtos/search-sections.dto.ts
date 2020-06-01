import { ApiProperty } from "@nestjs/swagger";

export class SearchSectionsDTO {
    @ApiProperty()
    studentId: string;
}