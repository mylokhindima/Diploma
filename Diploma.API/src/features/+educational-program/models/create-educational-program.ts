import { EducationalForm } from './../../../enums/educational-form.enum';
import { ApiProperty } from "@nestjs/swagger";
import { StudentDegree } from './../../../enums/student-degree.enum';

export class CreateEducationalProgramDTO {
    @ApiProperty()
    specialtyId: string;
    @ApiProperty()
    degree: StudentDegree;
    @ApiProperty()
    form: EducationalForm;
    @ApiProperty()
    duration: number;
}