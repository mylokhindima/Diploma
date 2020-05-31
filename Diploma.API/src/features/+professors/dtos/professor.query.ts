import { Role } from './../../../enums/role.enum';
import { ApiProperty } from "@nestjs/swagger";

export class ProfessorQuery {
    @ApiProperty()
    departmentId?: string;
    @ApiProperty()
    isActive?: boolean;
    @ApiProperty()
    available?: boolean;
    @ApiProperty()
    role?: Role;
}