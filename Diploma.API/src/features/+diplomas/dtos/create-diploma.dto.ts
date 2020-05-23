import { ApiProperty } from "@nestjs/swagger";

export class CreateDiplomaDTO {
    @ApiProperty()
    instructorId?: string;
    @ApiProperty()
    studentId: string;
    @ApiProperty()   
    theme?: string;
}