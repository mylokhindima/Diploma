import { ObjectID } from 'mongodb';
import { ApiProperty } from "@nestjs/swagger";

export class SearchDiplomasQuery {
    @ApiProperty()
    studentId?: string | ObjectID;
    @ApiProperty()
    stageId?: string | ObjectID;
    @ApiProperty()
    instructorId?: string | ObjectID;
}