import { ApiProperty } from '@nestjs/swagger';
import { CreateDepartmentMemberDTO } from '../../+department-members/dtos/create-department-member.dto';
import { ProfessorDegree } from './../../../enums/proffesor-degree.enum';

export class CreateProfessorDTO extends CreateDepartmentMemberDTO {
    @ApiProperty()
    degree?: ProfessorDegree;
}