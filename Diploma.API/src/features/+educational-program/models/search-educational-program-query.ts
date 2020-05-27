import { ApiProperty } from "@nestjs/swagger";

export class SearchEducationalProgramQuery {
    @ApiProperty()
    departmentId: string; 
}