import { ApiProperty } from "@nestjs/swagger";

export class CreateSpecialtyDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    code: string;
    @ApiProperty()
    departmentId: string;    
}