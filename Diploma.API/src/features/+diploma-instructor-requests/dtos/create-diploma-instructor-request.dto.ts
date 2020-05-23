import { ApiProperty } from "@nestjs/swagger";

export class CreateDiplomaInstructorRequest {
    @ApiProperty()
    toId: string;
    fromId: string;
    @ApiProperty()
    description: string;
}