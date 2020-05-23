import { ApiProperty } from "@nestjs/swagger";

export class ProfessorQuery {
    @ApiProperty()
    departmentId?: string;
    @ApiProperty()
    isActive?: boolean;
}