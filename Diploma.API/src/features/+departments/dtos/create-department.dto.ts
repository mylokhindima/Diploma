import { ApiProperty } from "@nestjs/swagger";

export class CreateDepartmentDTO {
    @ApiProperty()
    name: string;
}