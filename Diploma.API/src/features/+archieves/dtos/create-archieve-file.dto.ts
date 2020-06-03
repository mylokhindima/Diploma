import { FileType } from './../../../enums/file-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArchieveFileDTO {
    @ApiProperty({ type: 'string', format: 'binary' })
    file;
    @ApiProperty()
    id: string;
    @ApiProperty()
    type: FileType;
}