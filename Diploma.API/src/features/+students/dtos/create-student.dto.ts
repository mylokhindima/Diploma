import { CreateUserDTO } from '../../+users/dtos/create-user.dto';
import { StudentDegree } from '../../../enums/student-degree.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDTO extends CreateUserDTO {
    @ApiProperty()
    degree: StudentDegree;
    @ApiProperty()
    educationalProgramId: string;
    @ApiProperty()
    group: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
}
