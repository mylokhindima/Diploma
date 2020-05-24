import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDTO {
    @ApiProperty()
    reportId: string;
    @ApiProperty()
    comment: string;
}
