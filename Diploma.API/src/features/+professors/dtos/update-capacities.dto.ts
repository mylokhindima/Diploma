import { ApiProperty } from "@nestjs/swagger";

export class UpdateCapacityDTO {
    @ApiProperty()
    professorId: string;
    @ApiProperty()
    capacity: string;
}