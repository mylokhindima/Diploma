import { ApiProperty } from '@nestjs/swagger';
import { Step } from './../../../enums/step.enum';
export class SearchStudentsDTO {
    @ApiProperty()
    departmentId?: string;
    @ApiProperty()
    step?: Step;
    @ApiProperty()
    isActive?: boolean;
}