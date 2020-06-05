import { ApiProperty } from "@nestjs/swagger";

export class UpdateDiplomaDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    instructorId?: string;
    @ApiProperty()
    theme?: string;
}