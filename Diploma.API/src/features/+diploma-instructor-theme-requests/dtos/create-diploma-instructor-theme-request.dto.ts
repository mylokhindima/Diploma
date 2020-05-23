import { ApiProperty } from '@nestjs/swagger';
import { CreateDiplomaInstructorRequest } from './../../+diploma-instructor-requests/dtos/create-diploma-instructor-request.dto';

export class CreateDiplomaInstructorThemeRequestDTO extends CreateDiplomaInstructorRequest {
    @ApiProperty()
    theme: string;
}