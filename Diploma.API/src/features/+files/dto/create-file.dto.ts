import { ApiProperty } from '@nestjs/swagger';
import { FileType } from './../../../enums/file-type.enum';

export class CreateFileDTO {
    @ApiProperty()
    type: FileType;
    @ApiProperty()
    path: string;
    @ApiProperty()
    name: string;
}