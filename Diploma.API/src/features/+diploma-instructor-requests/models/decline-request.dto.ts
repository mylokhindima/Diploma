import { ApiProperty } from "@nestjs/swagger";

export class DeclineRequestDTO {
    @ApiProperty()
    requestId: string;
    @ApiProperty()
    comment: string;
}