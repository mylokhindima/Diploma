import { ApiProperty } from "@nestjs/swagger";
import { ObjectID } from 'mongodb';
import { Step } from './../../../enums/step.enum';

export class SearchDiplomaReports {
    @ApiProperty()
    step?: Step;
    @ApiProperty()
    instructorId?: string | ObjectID;
}