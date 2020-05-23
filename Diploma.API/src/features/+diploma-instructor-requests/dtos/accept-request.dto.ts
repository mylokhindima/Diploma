import { ApiProperty } from "@nestjs/swagger";

export class AcceptRequestDTO {
    @ApiProperty()
    requestId: string;
}