import { Role } from './../../../enums/role.enum';
import { ApiProperty } from "@nestjs/swagger";

export class SetRolesDTO {
    @ApiProperty()
    professorId: string;
    @ApiProperty()
    roles: Role[];
}