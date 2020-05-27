import { ProfessorDegree } from './../../../enums/proffesor-degree.enum';
import { ProfessorEntity } from './../../+professors/professor.entity';

export function getInstructorWithDegree(instructor: ProfessorEntity): string {
    let degree: string;

    switch(instructor.degree) {
        case ProfessorDegree.Assistant: 
            degree = 'ас.';
            break;
        case ProfessorDegree.Docent: 
            degree = 'доц.';
            break;
        case ProfessorDegree.Professor: 
            degree = 'проф.';
        case ProfessorDegree.SeniorLecturer:
            degree = 'ст.викл.';
            break;
    }

    return `${degree} ${instructor.name}`;
}