import { FileType } from './../../../enums/file-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SearchFileDTO {
    @ApiProperty()
    types?: FileType[];
}