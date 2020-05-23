import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from '../../+users/dtos/create-user.dto';

export class CreateDepartmentMemberDTO extends CreateUserDTO {
    @ApiProperty()
    departmentId: string;
}