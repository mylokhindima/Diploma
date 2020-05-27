import * as Excel from 'exceljs';
import { EducationalForm } from '../../../enums/educational-form.enum';
import { StudentDegree } from '../../../enums/student-degree.enum';
import { StudentEntity } from '../../../features/+students/student.entity';
import { DiplomaEntity } from './../../+diplomas/diploma.entity';
import { EducationalProgramEntity } from './../../+educational-program/educational-program.entity';
import { PracticeEntity } from './../../+practices/practice.entity';
import { ExcelBuilder } from './excel-builder.interface';
import { getInstructorWithDegree } from './instructor-with-degree';
import moment = require('moment');
import path = require('path');

export class PracticeOrderBuilder implements ExcelBuilder {
    
    private _workbook = new Excel.Workbook();

    constructor(private _educationalProgram: EducationalProgramEntity, private _startDate: string, private _endDate: string) {}

    public async build(map: [StudentEntity, DiplomaEntity, PracticeEntity][]): Promise<Excel.Workbook> {
        this._workbook = await this._workbook.xlsx.readFile(path.join(__dirname + '/practice-order-template.xlsx')); 
        
        const worksheet = this._workbook.getWorksheet(1);
        worksheet.getCell('A9:G9').value = this._getDescriptionText(this._educationalProgram, this._startDate, this._endDate);

        const startIndex = 12;

        map.forEach(([student, diploma, practice], i) => {
            worksheet.getRow(startIndex + i).values = [
                i + 1,
                student.name,
                student.group,
                practice.location,
                getInstructorWithDegree(practice.instructor),
                diploma.theme,
                getInstructorWithDegree(diploma.instructor),
            ]
        });

        return this._workbook;
    }

    private _getDescriptionText(educationalProgram: EducationalProgramEntity, startDate: string, endDate: string): string {
        const t1 = moment(startDate).format('DD.MM.YY') 
        const t2 = moment(endDate).format('DD.MM.YY') 

        const degree = educationalProgram.degree;

        let degreeText: string;
        let form: string;

        switch(educationalProgram.form) {
            case EducationalForm.DayTime: 
                form = 'денної';
                break;
            case EducationalForm.Extramural:
                form = 'заочної';
                break;
            case EducationalForm.Remote:
                form = 'дистанційної';
                break;
            default:
        }

        if (degree === StudentDegree.Bachelor) {
            degreeText = '4-го курсу першого бакалаврського рівня вищої освіти';
        } else {
            degreeText = '6-го курсу другого магістерського рівня вищої освіти';
        }

        return `У відповідності до навчального плану нижче вказаних студентів ${degreeText} ${form} форми навчання, факультету КН за спеціальністю ${educationalProgram.specialty.code} - ${educationalProgram.specialty.name}, освітньою програмою - ${educationalProgram.name} направити з ${t1} по ${t2} на передатестаційну практику з можливістю використання дистанційних технологій, закріпити за ними теми атестаційних робіт, призначити керівників атестаційних робіт та керівників передатестаційної практики. `
    }
}